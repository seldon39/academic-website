module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/assets/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/assets/*.png");
  return {
    dir: {
      input: "src",          // 11ty va maintenant lire les pages dans src/
      output: "_site",       // et fabriquer le site web dans _site/
      includes: "_includes"  // où seront rangés nos modèles de page
    }
  };
};