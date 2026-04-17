import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project — silences the
  // "multiple lockfiles detected" warning when a parent directory
  // also has a package-lock.json.
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
