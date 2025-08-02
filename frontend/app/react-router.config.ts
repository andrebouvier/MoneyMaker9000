import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  // Put the routes of the pages that you want to be statically prerendere in the return array
  async prerender() {
    return [""];
  },
} satisfies Config;
