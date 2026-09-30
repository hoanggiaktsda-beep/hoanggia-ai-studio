# HOANGGIA AI Backend

The frontend stays on GitHub Pages. The AI provider key stays server-side.

## Deploy
Deploy this repository to Vercel and add:
- OPENAI_API_KEY
- HG_VISION_MODEL (optional, default gpt-5.6-luna)
- HG_IMAGE_MODEL (optional, default gpt-image-2)

Routes:
- /api/health
- /api/analyze
- /api/render
- /api/edit

The frontend sends image data to these serverless routes. Never commit an API key.

Pipeline:
Analyze -> Design Intelligence -> Magic Prompt -> Render/Edit -> result image.
Multi-view Sync creates a consistency prompt that can be sent with the Master image to /api/render.
