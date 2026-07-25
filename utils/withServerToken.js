// utils/withServerToken.js
//
// THE single place that decides how outbound API calls authenticate.
//
// During SSR the Nuxt server calls the backend with no browser Origin header,
// so the backend's ValidateOrigin middleware would reject it. Instead we send a
// shared secret (X-Server-Token) that the backend trusts for server-to-server
// callers.
//
// The token lives in PRIVATE runtime config (config.apiServerToken), which is
// undefined on the client — so on the client this function adds nothing and the
// request authenticates by Origin as before. The secret therefore never reaches
// the browser bundle.
//
// Usage (inside a Pinia action or composable that already has runtimeConfig):
//   const config = useRuntimeConfig()
//   $fetch(url, { headers: withServerToken(config, { 'Cache-Control': '...' }) })

export function withServerToken(config, headers = {}) {
    if (import.meta.server && config?.apiServerToken) {
        return { ...headers, 'X-Server-Token': config.apiServerToken }
    }
    return headers
}
