const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:7001',
            changeOrigin: true,
        })
    );
    app.use(
        '/res',
        createProxyMiddleware({
            target: 'http://localhost:7001',
            changeOrigin: true,
        })
    );
};
