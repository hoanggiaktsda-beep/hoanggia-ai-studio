import {body,json,openai,options,dataUrlToBlob} from "./_lib/openai.js";
export default async function handler(req,res){
 if(options(req,res))return;if(req.method!=="POST")return json(res,405,{error:"POST required"});
 try{
  const b=body(req);if(!b.prompt)return json(res,400,{error:"prompt is required"});
  const form=new FormData();form.append("model",process.env.HG_IMAGE_MODEL||"gpt-image-2");form.append("prompt",b.prompt);form.append("size",b.size||"1536x1024");form.append("quality",b.quality==="Draft · Fast"?"low":b.quality==="Ultra · Detail"?"high":"medium");
  if(b.masterImage)form.append("image[]",dataUrlToBlob(b.masterImage),"master.png");
  const r=await openai("/images/edits",{method:"POST",body:form});const item=r.data?.[0];
  return json(res,200,{ok:true,image:item?.b64_json?"data:image/png;base64,"+item.b64_json:null,revised_prompt:item?.revised_prompt||null});
 }catch(e){return json(res,500,{error:e.message})}
}
