import {body,json,openai,options} from "./_lib/openai.js";
export default async function handler(req,res){
 if(options(req,res))return;
 if(req.method!=="POST")return json(res,405,{error:"POST required"});
 try{
  const b=body(req);
  if(!b.change)return json(res,400,{error:"change is required"});
  const system=`You are HOANGGIA AI Decision Diff Engine. Read a professional architecture/interior design change request and map it against the current Design State. Return ONLY valid JSON.
Schema:
{
 "change": [{"field":"materials|lighting|furniture|camera|space|style|function|proportion|circulation|ergonomics|constraints","before":"","after":"","reason":""}],
 "keep":["field names that must remain unchanged"],
 "lock":["protected elements that must not change"],
 "propagate":["render","edit","camera","concept","sync"],
 "summary":"concise Vietnamese explanation"
}
Rules: change only what the user explicitly requests. Keep unrelated decisions. Lock architecture/walls/openings/ceiling/floor/proportions/furniture form/camera unless explicitly requested. If material changes, propagate render/edit/concept/sync; camera only if the request affects composition. Never invent a before value if absent; use empty string. Vietnamese output.`;
  const input=[{role:"system",content:system},{role:"user",content:[
   {type:"input_text",text:"CURRENT DESIGN STATE:\n"+JSON.stringify(b.design_state||{})+"\n\nUSER CHANGE:\n"+b.change}
  ]}];
  const r=await openai("/responses",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:process.env.HG_VISION_MODEL||"gpt-5.6-luna",input,max_output_tokens:1000})});
  const raw=r.output_text||"{}";let diff;try{diff=JSON.parse(raw)}catch{diff={change:[],keep:[],lock:[],propagate:[],summary:raw}};
  return json(res,200,{ok:true,diff,model:r.model});
 }catch(e){return json(res,500,{error:e.message})}
}