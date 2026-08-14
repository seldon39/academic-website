const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  // Passthrough copy des assets et configurations
  eleventyConfig.addPassthroughCopy("src/assets");
  // Permet à Safari d'accéder directement à /apple-touch-icon.png à la racine
  eleventyConfig.addPassthroughCopy({ "src/assets/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");
  // Transform pour minifier automatiquement le HTML lors de la génération (_site)
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
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