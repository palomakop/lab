

export default function(eleventyConfig) {

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/shaders");
  eleventyConfig.addPassthroughCopy("./src/p5-sketches");
  eleventyConfig.addPassthroughCopy("./src/models");

};
