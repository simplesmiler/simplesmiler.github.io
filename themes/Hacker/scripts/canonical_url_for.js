hexo.extend.helper.register('canonical_url_for', function canonicalUrlForHelper(path, options) {
  var base = this.config.url;
  if (base[base.length - 1] === '/') base = base.slice(0, -1);

  return base + this.url_for(path, options).replace(/index\.html$/, '');
});
