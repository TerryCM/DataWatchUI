const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const REQUIRED_PARAMS = [
  'SERVER_PORT',
  'UI_BASE_URL',
  'API_BASE_URL',
]

const PUBLIC_PARAMS = [
  'UI_BASE_URL',
  'API_BASE_URL',
  'WS_BASE_URL',
  'THEME',
  'INTERCOM_APP_ID',
  'INTERCOM_TOKEN',
  'INTERCOM_COMPANY_ID',
  'CACAO_DEV_MODE',
  'NODE_ENV',
]

// Verify that required configuration params are set
for (const p of REQUIRED_PARAMS) {
  if (!(p in process.env) || typeof process.env[p] === 'undefined')
    throw('Missing required configuration parameter: ' + p)
}

// Instead of appending NEXT_PUBLIC to config params accessible by frontend
const publicRuntimeConfig = {}
for (const p of PUBLIC_PARAMS) {
  publicRuntimeConfig[p] = process.env[p]
}

module.exports = withBundleAnalyzer({
  publicRuntimeConfig
})
