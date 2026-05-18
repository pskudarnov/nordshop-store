#!/usr/bin/env node

const DEFAULT_SITE_URL = "https://nordshop.pavel-skudarnov.ru";
const REQUEST_TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 15000);

function normalizeBaseUrl(raw) {
  const trimmed = (raw || "").trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  url.search = "";
  url.hash = "";
  return url;
}

function pageUrlFromBase(baseUrl) {
  const pageUrl = new URL(baseUrl.toString());
  pageUrl.pathname = "/";
  pageUrl.search = "";
  pageUrl.hash = "";
  return pageUrl;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "nordshop-smoke-assets/1.0" },
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function extractAssetPaths(html, extension) {
  const escaped = extension.replace(".", "\\.");
  const regex = new RegExp(
    `(["'])([^"']*\\/_next\\/static\\/[^"']*${escaped}(?:\\?[^"']*)?)\\1`,
    "gi",
  );
  const results = new Set();

  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawPath = match[2]?.trim();
    if (!rawPath) continue;
    results.add(rawPath);
  }

  return [...results];
}

function toAbsoluteAssetUrl(baseUrl, assetPath) {
  return new URL(assetPath, baseUrl).toString();
}

async function checkAsset(url, timeoutMs) {
  let response;
  try {
    response = await fetchWithTimeout(url, timeoutMs);
  } catch (error) {
    const message =
      error?.name === "AbortError"
        ? `Timeout after ${timeoutMs}ms`
        : error?.message || "Unknown request error";
    return { ok: false, status: null, message };
  }

  return {
    ok: response.status === 200,
    status: response.status,
    message: response.status === 200 ? "OK" : `HTTP ${response.status}`,
  };
}

async function run() {
  const argUrl = process.argv[2];
  const envUrl = process.env.SITE_URL;
  const siteUrl = argUrl || envUrl || DEFAULT_SITE_URL;

  let baseUrl;
  try {
    baseUrl = normalizeBaseUrl(siteUrl);
  } catch {
    console.error("❌ Production asset smoke-check failed");
    console.error(`Invalid site URL: ${siteUrl}`);
    process.exit(1);
  }

  const pageUrl = pageUrlFromBase(baseUrl);

  let pageResponse;
  try {
    pageResponse = await fetchWithTimeout(pageUrl.toString(), REQUEST_TIMEOUT_MS);
  } catch (error) {
    const message =
      error?.name === "AbortError"
        ? `Timeout after ${REQUEST_TIMEOUT_MS}ms`
        : error?.message || "Unknown request error";

    console.error("❌ Production asset smoke-check failed");
    console.error(`Page: ${pageUrl.toString()}`);
    console.error(`Request error: ${message}`);
    process.exit(1);
  }

  if (pageResponse.status !== 200) {
    console.error("❌ Production asset smoke-check failed");
    console.error(`Page: ${pageUrl.toString()}`);
    console.error(`Status: ${pageResponse.status}`);
    process.exit(1);
  }

  const html = await pageResponse.text();
  const cssPaths = extractAssetPaths(html, ".css");
  const jsPaths = extractAssetPaths(html, ".js");

  if (cssPaths.length === 0) {
    console.error("❌ Production asset smoke-check failed");
    console.error(`Page: ${pageUrl.toString()}`);
    console.error("No CSS assets found in HTML for /_next/static/...");
    process.exit(1);
  }

  if (jsPaths.length === 0) {
    console.error("❌ Production asset smoke-check failed");
    console.error(`Page: ${pageUrl.toString()}`);
    console.error("No JS assets found in HTML for /_next/static/...");
    process.exit(1);
  }

  let cssOk = 0;
  let jsOk = 0;

  for (const path of cssPaths) {
    const url = toAbsoluteAssetUrl(baseUrl, path);
    const result = await checkAsset(url, REQUEST_TIMEOUT_MS);
    if (!result.ok) {
      console.error("❌ Production asset smoke-check failed");
      console.error(`Page: ${pageUrl.toString()}`);
      console.error("Broken CSS asset:");
      console.error(url);
      console.error(`Status: ${result.status ?? result.message}`);
      process.exit(1);
    }
    cssOk += 1;
  }

  for (const path of jsPaths) {
    const url = toAbsoluteAssetUrl(baseUrl, path);
    const result = await checkAsset(url, REQUEST_TIMEOUT_MS);
    if (!result.ok) {
      console.error("❌ Production asset smoke-check failed");
      console.error(`Page: ${pageUrl.toString()}`);
      console.error("Broken JS asset:");
      console.error(url);
      console.error(`Status: ${result.status ?? result.message}`);
      process.exit(1);
    }
    jsOk += 1;
  }

  console.log("✅ Production asset smoke-check passed");
  console.log(`Page: ${pageUrl.toString()}`);
  console.log(`CSS assets: ${cssOk}/${cssPaths.length} OK`);
  console.log(`JS assets: ${jsOk}/${jsPaths.length} OK`);
  process.exit(0);
}

run().catch((error) => {
  console.error("❌ Production asset smoke-check failed");
  console.error(error?.message || "Unexpected error");
  process.exit(1);
});
