
module.exports = function(root, assets) {
  return {
    css: {
      less: require('./less')(root, assets)
    }
  };
};
