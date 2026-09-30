# HOANGGIA AI — AI Execution Endpoint

HOANGGIA AI is a static GitHub Pages application. The browser must **never contain a provider API key**. Real image generation is performed by a secure serverless endpoint.

Configure the endpoint in **Phòng Kết xuất → Endpoint AI**. The same endpoint is used by:

- `render` — master render
- `edit` — selective edit
- `camera` — generate multiple camera views
- `sync` — regenerate/synchronize multiple views

## Request

```json
{
  "operation": "render | edit | camera | sync",
  "project": { "name": "...", "scene": "..." },
  "domain": "Kiến trúc | Nội thất | Quy hoạch",
  "intent": "GIỮ NGUYÊN | NÂNG CẤP | PHÁT TRIỂN | ĐỊNH HƯỚNG NGHỆ THUẬT",
  "master": "data:image/...;base64,...",
  "reference": "data:image/...;base64,...",
  "prompt": "...",
  "design_state": {},
  "quality": "Cao · 1536×1024",
  "count": 6,
  "scope": "...",
  "strength": "...",
  "camera_height": "..."
}
```

## Response

Render/edit:

```json
{ "image": "data:image/png;base64,..." }
```

Camera/sync:

```json
{ "images": ["data:image/png;base64,..."] }
```

Errors:

```json
{ "error": "Human-readable error message" }
```

## Security

Use a server-side environment variable such as `OPENAI_API_KEY` or another provider secret. Do **not** paste API keys into `index.html`, GitHub Pages, or browser localStorage.

The current HOANGGIA AI frontend is provider-agnostic: the endpoint can route these operations to the image model/provider chosen for the production system.
