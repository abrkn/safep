module.exports = function safep() {
  var fn = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);

  return Promise.resolve()
    .then(!args ? fn : function() { return fn.apply(this, args); })
    .then(result => [undefined, result])
    .catch(error => [error, undefined]);
};
