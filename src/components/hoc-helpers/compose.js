const compose = (...func) => (component) => {
  return func.reduceRight((acc, f) => f(acc), component);
};

export default compose;
