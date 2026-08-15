const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  // Passthrough copy des assets et configurations
  eleventyConfig.addPassthroughCopy("src/assets");
  // Permet à Safari d'accéder directement à /apple-touch-icon.png à la racine
  eleventyConfig.addPassthroughCopy({ "src/assets/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");

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