import { defineConfig } from "astro/config";

// Served at https://athiramk.com/wild-days/ (a GitHub Pages project site under the custom domain).
// If you rename the repository, change `base` to "/<new-repo-name>".
export default defineConfig({
  site: "https://athiramk.com",
  base: "/wild-days",
  trailingSlash: "always",
});
