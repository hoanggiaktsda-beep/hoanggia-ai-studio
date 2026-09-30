import {body,json,openai,options} from "./_lib/openai.js";
export default async function handler(req,res){
 if(options(req,res))return;if(req.method!=="POST")return json(res,405,{error:"POST required"});
 try{
  const b=body(req);if(!b.master?.image)return json(res,400,{error:"master.image is required"});
  const engineProfiles={
   architecture:"ARCHITECTURE ENGINE: inspect site/context, massing, proportion, floor count, structural cues, facade rhythm, openings, roofline, material junctions, daylight and constructability. Do not turn an interior observation into an architectural conclusion.",
   interior:"INTERIOR ENGINE: inspect program/function, zoning, ergonomics, human scale, circulation, furniture composition and exact furniture form, joinery, material palette, ceiling/floor/wall interfaces, lighting layers, styling and camera. Preserve furniture models unless explicitly changed.",
   planning:"PLANNING ENGINE: inspect site boundary, land use, density, zoning, public/private hierarchy, pedestrian/vehicular circulation, access, landscape structure, massing relationships, skyline, topography cues and urban context. Do not infer detailed zoning dimensions that are not visible."
  };
  const engine=engineProfiles[b.engine]||engineProfiles.architecture;
  const system=`You are HOANGGIA AI Design Intelligence Core. You are a professional domain-specific design analyst. MASTER is the absolute source of truth. Return ONLY valid JSON. Analyze visible evidence only; never invent hidden geometry. Reference can inform style/material/form only when requested. Domain: ${b.domain||"Kiến trúc"}. Intent: ${b.intent||"GIỮ NGUYÊN"}. Engine: ${b.engine||"architecture"}.
${engine}
Required JSON keys: design_summary, function, ergonomics, proportion, circulation, space, materials, lighting, furniture, camera, style, constraints, recommendations.
Each value must be concise professional Vietnamese text. constraints must explicitly protect the domain-relevant existing elements unless the user asks to change them. recommendations must be practical and constructable. ergonomics should mention relevant human-scale checks only when applicable. The same image must produce materially different analysis when the domain changes.`;

  const content=[{type:"input_text",text:"Create a Design Intelligence Report from this MASTER image."},{type:"input_image",image_url:b.master.image,detail:"high"}];
  if(b.reference?.image)content.push({type:"input_text",text:"REFERENCE: use only as requested style/material/form cue; do not replace MASTER geometry."},{type:"input_image",image_url:b.reference.image,detail:"high"});
  const r=await openai("/responses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:process.env.HG_VISION_MODEL||"gpt-5.6-luna",input:[{role:"system",content:system},{role:"user",content}],max_output_tokens:1600})});
  const raw=r.output_text||"";let summary;try{summary=JSON.parse(raw)}catch{summary={design_summary:raw}};
  return json(res,200,{ok:true,summary,design_state:{...summary,domain:b.domain||"Kiến trúc",intent:b.intent||"GIỮ NGUYÊN"},model:r.model});
 }catch(e){return json(res,500,{error:e.message})}
}