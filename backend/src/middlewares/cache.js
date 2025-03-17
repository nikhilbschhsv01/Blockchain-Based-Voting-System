const memoryCache = require("memory-cache");

module.exports = (duration) => {
  return (req, res, next) => {
    const key = "__route__" + (req.originalUrl || req.url);

    const cache = memoryCache.get(key);
    if (cache) return res.send(cache);

    // if no cache-hit then
    const temp = res.send.bind(res);

    res.send = (body) => {
      memoryCache.put(key, body, duration * 1000);
      return temp(body);
    };

    next();
  };
};
