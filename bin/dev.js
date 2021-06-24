const parcelBundler = require('parcel-bundler');
const app = require('express')();
const Path = require('path');
const net = require('net');


if (!process.argv[2]) {
    console.error('The entered path does not exist')
    return
}
// 单个入口文件路径
const urlPath = process.argv[2];

const entryFile = Path.join(__dirname, '../' + urlPath);

console.log(entryFile)

const bundler = new parcelBundler(entryFile, {
    outDir:'.parcel-cache',
    publicUrl: '/',
    watch:true,
    hmr: true,
    cache: true,
    cacheDir: '.parcel-cache',
    sourceMaps: true,
    detailedReport: true
});

app.use(bundler.middleware());

function portInUse(port) {
    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port);
        server.on('listening', function () {
            server.close();
            resolve(port);
        });
        server.on('error', function (err) {
            if (err.code == 'EADDRINUSE') {
                resolve(err);
            }
        });
    });
}

const tryUsePort = async function (port, portAvailableCallback) {
    let res = await portInUse(port);
    if (res instanceof Error) {
        port++;
        tryUsePort(port, portAvailableCallback);
    } else {
        portAvailableCallback(port);
    }
}

// default port 
let port = 8081;

tryUsePort(port, function (port) {
    app.listen(port);
    console.log('Server running at http://localhost:'+port)
})