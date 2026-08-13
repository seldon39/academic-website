module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
    // Permet à Safari d'accéder directement à /apple-touch-icon.png à la racine
  eleventyConfig.addPassthroughCopy({ "src/assets/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  return {
    dir: {
      input: "src",          // 11ty va maintenant lire les pages dans src/
      output: "_site",       // et fabriquer le site web dans _site/
      includes: "_includes"  // où seront rangés nos modèles de page
    }
  };
};