const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:7001',
            changeOrigin: true,
            logLevel: 'debug', // 添加调试日志
            pathRewrite: (path, req) => {
                console.log(`Original Path: ${path}`);
                return '/api' + path; // 保留原路径
            }
        })
    );
    app.use(
        '/res',
        createProxyMiddleware({
            target: 'http://localhost:7001',
            changeOrigin: true,
            logLevel: 'debug', // 添加调试日志
            pathRewrite: (path, req) => {
                console.log(`Original Path: ${path}`);
                return '/res' + path; // 保留原路径
            }
        })
    );
    app.use(
        '/static',
        createProxyMiddleware({
            target: 'http://localhost:7001',
            changeOrigin: true,
            logLevel: 'debug', // 添加调试日志
            pathRewrite: (path, req) => {
                console.log(`Original Path: ${path}`);
                return '/static' + path; // 保留原路径
            }
        })
    );
};
