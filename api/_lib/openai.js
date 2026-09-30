const API="https://api.openai.com/v1";
export function cors(res){res.setHeader("Access-Control-Allow-Origin","*");res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");res.setHeader("Access-Control-Allow-Methods","POST, OPTIONS");}
export function json(res,status,data){cors(res);res.status(status).json(data);}
export function body(req){return typeof req.body==="string"?JSON.parse(req.body):req.body||{};}
export function key(){if(!process.env.OPENAI_API_KEY)throw new Error("OPENAI_API_KEY is not configured");return process.env.OPENAI_API_KEY;}
export async function openai(path,options={}){const r=await fetch(API+path,{...options,headers:{"Authorization":"Bearer "+key(),...(options.headers||{})}});const text=await r.text();let data;try{data=JSON.parse(text)}catch{data={raw:text}}if(!r.ok)throw new Error(data?.error?.message||"OpenAI request failed");return data;}
export function dataUrlToBlob(dataUrl){const m=String(dataUrl).match(/^data:(.+?);base64,(.+)$/);if(!m)throw new Error("Invalid image data URL");return new Blob([Buffer.from(m[2],"base64")],{type:m[1]});}
export function options(req,res){if(req.method==="OPTIONS"){cors(res);res.status(204).end();return true}return false;}
