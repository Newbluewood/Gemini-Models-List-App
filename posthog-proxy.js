// PostHog reverse proxy (EU) — browser eventi idu kroz naš domen
export const POSTHOG_PROXY_PATH = '/gem-events';

const API_HOST = 'eu.i.posthog.com';
const ASSET_HOST = 'eu-assets.i.posthog.com';

function buildForwardHeaders(req, posthogHost) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (value === undefined || name === 'host') continue;
    if (Array.isArray(value)) value.forEach((v) => headers.append(name, v));
    else headers.set(name, value);
  }

  headers.set('host', posthogHost);
  if (req.headers.host) headers.set('X-Forwarded-Host', req.headers.host);

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    req.ip;
  if (clientIp) {
    headers.set('X-Real-IP', clientIp);
    headers.set('X-Forwarded-For', clientIp);
  }

  headers.delete('cookie');
  headers.delete('connection');
  return headers;
}

export async function posthogProxyHandler(req, res) {
  const pathname = req.url || '/';
  const useAssetHost = pathname.startsWith('/static/') || pathname.startsWith('/array/');
  const posthogHost = useAssetHost ? ASSET_HOST : API_HOST;

  try {
    const upstream = await fetch(new URL(pathname, `https://${posthogHost}`), {
      method: req.method,
      headers: buildForwardHeaders(req, posthogHost),
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
    });

    res.status(upstream.status);
    upstream.headers.forEach((value, name) => {
      if (name === 'content-encoding' || name === 'content-length') return;
      res.setHeader(name, value);
    });

    const body = Buffer.from(await upstream.arrayBuffer());
    res.send(body);
  } catch {
    res.status(502).send('Proxy error');
  }
}
