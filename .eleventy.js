const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Copy anything in the assets/ folder verbatim
  eleventyConfig.addPassthroughCopy("assets");

  // Enable syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/_posts/**/*.md");
  });

  eleventyConfig.setLiquidOptions({
    extname: ".html",
    root: ["src/_includes"]
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "_layouts",
      includes: "_includes",
    },
  }
};

