const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep) && file !== root) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      if (pathname !== '/' && !path.extname(pathname)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        fs.createReadStream(path.join(root, 'index.html')).pipe(res);
        return;
      }
      res.writeHead(404); res.end('Not found'); return;
    }
    res.setHeader('Content-Type', mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`SUNEXA listening on 0.0.0.0:${port}`);
});
