import {cors} from "./_lib/openai.js";
export default function handler(req,res){cors(res);res.status(200).json({ok:true,service:"HOANGGIA AI Backend",openaiConfigured:Boolean(process.env.OPENAI_API_KEY)});}
