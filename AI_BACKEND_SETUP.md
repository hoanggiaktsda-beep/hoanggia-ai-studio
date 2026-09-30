# HOANGGIA AI — Backend

GitHub Pages hosts the frontend. Real image generation runs through the Vercel serverless function `/api/ai`.

## Deploy

Import this repository into Vercel and deploy with no build command.

Endpoint:

`https://YOUR-VERCEL-DOMAIN.vercel.app/api/ai`

## Secret

In Vercel Project Settings → Environment Variables, create:

`OPENAI_API_KEY`

Optional:

`OPENAI_IMAGE_MODEL=gpt-image-2`

Never put the API key in GitHub, `index.html`, browser localStorage, or the endpoint URL.

## Connect

Open **Phòng Kết xuất** and enter the endpoint in **Endpoint kết xuất**. The same endpoint handles `render`, `edit`, `camera`, and `sync`.

Camera and sync run sequentially in the first production pass for easier monitoring.

OpenAI currently lists GPT-Image-2 as an image generation/editing model; account/model access may vary.
