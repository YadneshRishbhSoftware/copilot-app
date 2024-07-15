const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Specify the API path you want to proxy
    createProxyMiddleware({
      target: "http://localhost:3001", // Specify the address of your create-react-app development server
      changeOrigin: true,
      ws: true,
      secure: false, // Disable SSL certificate verification (only for development)
    })
  );
};
