export const config = { api: { bodyParser: { sizeLimit: "20mb" } } };

const OPENAI_URL = "https://api.openai.com/v1/images";
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";

function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json").send(JSON.stringify(body));
}

function dataUrlToBlob(dataUrl) {
  const m = /^data:(.+?);base64,(.+)$/.exec(dataUrl || "");
  if (!m) return null;
  const bytes = Buffer.from(m[2], "base64");
  return new Blob([bytes], { type: m[1] });
}

function cleanPrompt(p) {
  return String(p || "").slice(0, 12000);
}

function cameraPrompt(base, index, designState, cameraHeight) {
  const views = [
    "establishing wide view, show the complete space and spatial hierarchy",
    "hero composition focused on the principal furniture and architectural focal point",
    "natural eye-level editorial view, balanced composition and realistic circulation depth",
    "material detail view emphasizing joinery, surfaces and craftsmanship",
    "lifestyle perspective emphasizing depth, circulation and human scale",
    "close architectural/interior detail with controlled perspective and refined material texture"
  ];
  return [
    base,
    "CAMERA VARIATION ONLY.",
    views[index % views.length] + ".",
    "Camera height: " + (cameraHeight || "eye level") + ".",
    "Keep the exact architecture, openings, ceiling, floor, furniture identity, proportions, materials and lighting logic from MASTER.",
    "Do not redesign or substitute furniture. Do not move architectural elements.",
    "DESIGN STATE: " + JSON.stringify(designState || {})
  ].join("\n");
}

async function generate(prompt, size) {
  const r = await fetch(OPENAI_URL + "/generations", {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, prompt: cleanPrompt(prompt), size: size || "1536x1024", n: 1 })
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.error?.message || "OpenAI image generation failed");
  const b64 = j?.data?.[0]?.b64_json;
  if (!b64) throw new Error("Provider returned no image");
  return "data:image/png;base64," + b64;
}

async function edit(master, prompt, size) {
  const blob = dataUrlToBlob(master);
  if (!blob) return generate(prompt, size);
  const form = new FormData();
  form.append("model", MODEL);
  form.append("prompt", cleanPrompt(prompt));
  form.append("size", size || "1536x1024");
  form.append("n", "1");
  form.append("image", blob, "master.png");
  const r = await fetch(OPENAI_URL + "/edits", {
    method: "POST",
    headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
    body: form
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.error?.message || "OpenAI image edit failed");
  const b64 = j?.data?.[0]?.b64_json;
  if (!b64) throw new Error("Provider returned no edited image");
  return "data:image/png;base64," + b64;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "POST only" });
  if (!process.env.OPENAI_API_KEY) return json(res, 500, { error: "OPENAI_API_KEY is not configured on the server" });

  try {
    const body = req.body || {};
    const op = body.operation || "render";
    const size = String(body.quality || "").includes("2048") ? "2048x1365" : "1536x1024";
    const master = body.master;
    const state = body.design_state || {};

    if (op === "render") {
      const image = await generate(body.prompt, size);
      return json(res, 200, { image, operation: op, model: MODEL });
    }

    if (op === "edit") {
      const prompt = [
        "HOANGGIA AI SELECTIVE EDIT.",
        "MASTER IMAGE IS THE SOURCE OF TRUTH.",
        "CHANGE ONLY: " + String(body.prompt || ""),
        "PRESERVE architecture, openings, ceiling height, floor, proportions, camera and original furniture identity unless explicitly changed.",
        "Physically plausible architectural visualization. No geometry drift, no object substitution."
      ].join("\n");
      const image = await edit(master, prompt, size);
      return json(res, 200, { image, operation: op, model: MODEL });
    }

    if (op === "camera" || op === "sync") {
      const count = Math.min(Math.max(Number(body.count || 6), 1), 20);
      const images = [];
      for (let i = 0; i < count; i++) {
        const prompt = op === "camera"
          ? cameraPrompt(body.prompt || "Create a professional architectural visualization.", i, state, body.camera_height)
          : [
              "HOANGGIA AI VIEW SYNC.",
              "MASTER IMAGE IS THE SOURCE OF TRUTH.",
              "Create synchronized view " + (i + 1) + " of " + count + ".",
              "Change viewpoint only; preserve design decisions, architecture, furniture identity, material palette, lighting logic and proportions.",
              "DESIGN STATE: " + JSON.stringify(state),
              body.prompt || ""
            ].join("\n");
        images.push(await edit(master, prompt, size));
      }
      return json(res, 200, { images, operation: op, model: MODEL });
    }

    return json(res, 400, { error: "Unsupported operation: " + op });
  } catch (e) {
    return json(res, 500, { error: e?.message || "AI backend error" });
  }
}
