async function buildExpressContext(request, params = {}) {
  let body;
  if (request.method !== "GET" && request.method !== "HEAD" && request.method !== "DELETE") {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      body = Object.fromEntries((await request.formData()).entries());
    } else {
      try { body = await request.json(); } catch { body = {}; }
    }
  }
  const url = new URL(request.url);
  let responseBody;
  let responseStatus = 200;
  const responseHeaders = new Headers();
  let resolved = false;
  const res = {
    status(statusCode) { responseStatus = statusCode; return this; },
    json(payload) { responseBody = payload; resolved = true; return this; },
    send(payload) { responseBody = payload; resolved = true; return this; },
    cookie(name, value, options) {
      const serialized = [`${name}=${encodeURIComponent(value)}`];
      if (options?.httpOnly) serialized.push("HttpOnly");
      if (options?.secure) serialized.push("Secure");
      if (options?.sameSite) serialized.push(`SameSite=${options.sameSite}`);
      if (options?.maxAge) serialized.push(`Max-Age=${Math.floor(options.maxAge / 1000)}`);
      responseHeaders.append("Set-Cookie", serialized.join("; "));
      return this;
    },
  };
  const req = {
    method: request.method,
    body,
    params,
    query: Object.fromEntries(url.searchParams.entries()),
    headers: Object.fromEntries(request.headers.entries()),
    header(name) { return request.headers.get(name); },
    get(name) { return request.headers.get(name); },
    admin: undefined,
  };
  return { req, res, getResponse() {
    if (!resolved) responseBody = { success: false, message: "No response returned" };
    return Response.json(responseBody, { status: responseStatus, headers: responseHeaders });
  }};
}

export async function runExpressController(controller, request, params = {}) {
  const context = await buildExpressContext(request, params);
  await controller(context.req, context.res);
  return context.getResponse();
}

export async function runExpressPipeline(middlewares, controller, request, params = {}) {
  const context = await buildExpressContext(request, params);
  let index = -1;
  const dispatch = async (position) => {
    if (position <= index) throw new Error("next() called multiple times");
    index = position;
    const middleware = position === middlewares.length ? controller : middlewares[position];
    if (!middleware) return;
    await middleware(context.req, context.res, () => dispatch(position + 1));
  };
  await dispatch(0);
  return context.getResponse();
}
