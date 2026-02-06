/**
 * POST /api/music/generate-studio
 * Hero Jo Golden Backdoor Hit Factory — text-to-viral-pop-quality WAV.
 * Beautiful clean layered precision vocals and music; full studio quality.
 * Project lead: Hero Rick.
 *
 * Body: { prompt: string, duration?: number (seconds, 5–30), lyrics?: string }.
 * Returns: { url: string, backend?: 'heartmula'|'replicate', project_lead: string, endpoint: string }
 *   or 501 if not configured.
 * Same backends as /api/music/generate (HeartMuLa preferred for vocals); this endpoint
 * is the canonical studio-quality / viral-pop tier for Hero Jo Golden Backdoor Hit Factory.
 */

const MIN_DURATION = 5;
const MAX_DURATION = 30;
const PROJECT_LEAD = 'Hero Rick';
const ENDPOINT_NAME = 'Hero Jo Golden Backdoor Hit Factory';

function parseBody(req) {
  const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  const prompt = String(body.prompt || 'upbeat club hip hop beat').slice(0, 1000);
  const duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, Number(body.duration) || 15));
  const lyrics = body.lyrics != null ? String(body.lyrics).slice(0, 4000) : prompt;
  return { prompt, duration, lyrics };
}

async function tryHeartMuLa(heartMulaUrl, { prompt, duration, lyrics }) {
  const r = await fetch(heartMulaUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      duration,
      lyrics: lyrics || prompt,
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`HeartMuLa: ${r.status} ${t}`);
  }
  const data = await r.json();
  const url = data.url ?? data.output ?? data.audio_url ?? (Array.isArray(data) ? data[0] : data);
  if (!url || typeof url !== 'string') {
    throw new Error('HeartMuLa did not return audio URL');
  }
  return { url, backend: 'heartmula' };
}

async function tryReplicate(token, { prompt, duration }) {
  const Replicate = (await import('replicate')).default;
  const replicate = new Replicate({ auth: token });
  const output = await replicate.run('meta/musicgen', {
    input: {
      prompt,
      duration,
      model_version: 'large',
      output_format: 'wav',
    },
  });
  const url = Array.isArray(output) ? output[0] : output;
  if (!url || typeof url !== 'string') {
    throw new Error('Replicate did not return audio URL');
  }
  return { url, backend: 'replicate' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const heartMulaUrl = process.env.HEARTMULA_API_URL;
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!heartMulaUrl && !replicateToken) {
    return res.status(501).json({
      error: 'Studio music API not configured (set HEARTMULA_API_URL and/or REPLICATE_API_TOKEN for full studio quality)',
      project_lead: PROJECT_LEAD,
      endpoint: ENDPOINT_NAME,
    });
  }

  let body;
  try {
    body = parseBody(req);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  try {
    if (heartMulaUrl) {
      const result = await tryHeartMuLa(heartMulaUrl, body);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        ...result,
        project_lead: PROJECT_LEAD,
        endpoint: ENDPOINT_NAME,
      });
    }
    if (replicateToken) {
      const result = await tryReplicate(replicateToken, body);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        ...result,
        project_lead: PROJECT_LEAD,
        endpoint: ENDPOINT_NAME,
      });
    }
  } catch (e) {
    if (heartMulaUrl && replicateToken) {
      try {
        const result = await tryReplicate(replicateToken, body);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
          ...result,
          project_lead: PROJECT_LEAD,
          endpoint: ENDPOINT_NAME,
        });
      } catch (e2) {
        const msg = e2 instanceof Error ? e2.message : String(e2);
        return res.status(500).json({
          error: msg,
          project_lead: PROJECT_LEAD,
          endpoint: ENDPOINT_NAME,
        });
      }
    }
    const msg = e instanceof Error ? e.message : String(e);
    return res.status(500).json({
      error: msg,
      project_lead: PROJECT_LEAD,
      endpoint: ENDPOINT_NAME,
    });
  }

  return res.status(501).json({
    error: 'Studio music API not configured',
    project_lead: PROJECT_LEAD,
    endpoint: ENDPOINT_NAME,
  });
}
