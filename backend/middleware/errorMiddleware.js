const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  };
  
  const notFound = (req, res, next) => {
    res.status(404).json({ error: "Page Not Found" });
  };
  
  module.exports = { errorHandler, notFound };
  