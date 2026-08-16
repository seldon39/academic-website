const htmlmin = require("html-minifier-terser");
const katex = require("@vscode/markdown-it-katex").default;

module.exports = function(eleventyConfig) {
  // Passthrough copy des assets et configurations
  eleventyConfig.addPassthroughCopy("src/assets");
  // Permet à Safari d'accéder directement à /apple-touch-icon.png à la racine
  eleventyConfig.addPassthroughCopy({ "src/assets/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");

  // ── KaTeX ────────────────────────────────────────────────────────────────
  // Les formules sont rendues a la construction : aucun JavaScript n'est
  // envoye au visiteur.
  //
  // amendLibrary et NON setLibrary : on ajoute le greffon a la configuration
  // Markdown existante d'Eleventy au lieu de la remplacer. setLibrary ferait
  // perdre l'option html:true, dont dependent les blocs <div class="intro-...">
  // de vos pages, qui cesseraient d'etre interpretes.
  eleventyConfig.amendLibrary("md", (md) =>
    md.use(katex, { throwOnError: false, errorColor: "#cc0000" })
  );

  // Feuille de style et polices KaTeX, auto-hebergees : aucun CDN tiers.
  // Uniquement les .woff2 — les .woff et .ttf du paquet ne servent qu'a des
  // navigateurs que vous n'aurez pas, et quadrupleraient le poids deploye
  // (1,2 Mo contre 296 Ko).
  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist/katex.min.css": "assets/katex/katex.min.css",
    "node_modules/katex/dist/fonts/*.woff2": "assets/katex/fonts"
  });

  // Transform pour minifier automatiquement le HTML, JS et CSS inline
  eleventyConfig.addTransform("htmlmin", async function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = await htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true, // Préserve un espace entre les mots inline
        minifyCSS: true,             // Minifie le CSS présent dans les balises <style>
        minifyJS: true              // Minifie le JS présent dans les balises <script>
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",          // 11ty va lire les pages dans src/
      output: "_site",       // et fabriquer le site web dans _site/
      includes: "_includes"  // où seront rangés nos modèles de page
    }
  };
};