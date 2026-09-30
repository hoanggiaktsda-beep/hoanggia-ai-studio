import {body,json,openai,options} from "./_lib/openai.js";
export default async function handler(req,res){
 if(options(req,res))return;if(req.method!=="POST")return json(res,405,{error:"POST required"});
 try{
  const b=body(req);if(!b.master?.image)return json(res,400,{error:"master.image is required"});
  const system="You are HOANGGIA AI, an architectural and interior-design intelligence engine. Analyze the supplied MASTER image as the source of truth. Return ONLY valid JSON with keys: space, materials, lighting, furniture, camera, style. Be concise and design-specific. Never invent hidden geometry. Reference may inform style/material/form only when supplied. Domain: "+(b.domain||"Kiến trúc")+".";
  const content=[{type:"input_text",text:"Analyze this design image for professional visualization and prompt engineering."},{type:"input_image",image_url:b.master.image,detail:"high"}];
  if(b.reference?.image){content.push({type:"input_text",text:"Optional REFERENCE. Use only for style/material/form cues; never replace existing geometry."},{type:"input_image",image_url:b.reference.image,detail:"high"});}
  const r=await openai("/responses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:process.env.HG_VISION_MODEL||"gpt-5.6-luna",input:[{role:"system",content:system},{role:"user",content}],max_output_tokens:700})});
  const text=r.output_text||"";
  let summary;try{summary=JSON.parse(text)}catch{summary={space:text}};
  return json(res,200,{ok:true,summary,model:r.model});
 }catch(e){return json(res,500,{error:e.message})}
}
