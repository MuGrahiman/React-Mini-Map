module.exports = function(api) {
    api.cache(true);
  
    const presets = [
      '@babel/preset-env',
      '@babel/preset-react'
      // Add any other presets you want to include
    ];
  
    const plugins = [
      // Add any Babel plugins you want to include
    ];
  
    return {
      presets,
      plugins
    };
  }
  