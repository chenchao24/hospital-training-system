const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = {
  'html': 'text/html; charset=utf-8',
  'css': 'text/css; charset=utf-8',
  'js': 'application/javascript; charset=utf-8',
  'ico': 'image/x-icon',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'svg': 'image/svg+xml'
};

const ROOT = __dirname;

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).slice(1);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(5500, () => {
  console.log('✅ 项目已启动: http://localhost:5500');
});
