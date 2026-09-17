/**
 * Edge stub for Bunny Rabbit travel ops.
 * Use for health checks, WAF-adjacent headers, or proxying to Vercel origin.
 */
export interface Env {
  SERVICE_NAME: string;
  VERCEL_ORIGIN_URL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health" || url.pathname === "/api/health") {
      return Response.json({
        service: env.SERVICE_NAME ?? "bunny-rabbit-travel",
        edge: "cloudflare-worker",
        status: "ok",
        timestamp: new Date().toISOString(),
      });
    }

    if (env.VERCEL_ORIGIN_URL && url.pathname.startsWith("/")) {
      const origin = new URL(env.VERCEL_ORIGIN_URL);
      const proxied = new URL(request.url);
      proxied.protocol = origin.protocol;
      proxied.host = origin.host;
      return fetch(new Request(proxied.toString(), request));
    }

    return new Response(
      JSON.stringify({
        service: env.SERVICE_NAME,
        message:
          "Bunny Rabbit edge worker. Set VERCEL_ORIGIN_URL to proxy, or deploy Next to Cloudflare Pages.",
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );
  },
};
