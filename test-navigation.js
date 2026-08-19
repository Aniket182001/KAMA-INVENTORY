const http = require('http');

const routes = [
  '/',
  '/main',
  '/master-file',
  '/master-file/add',
  '/master-file/update',
  '/master-file/delete',
  '/process-creation',
  '/process-creation/add',
  '/process-creation/update',
  '/process-creation/delete',
  '/transaction-master',
  '/reports',
  '/reports/po-variance',
  '/dashboard',
  '/processes',
  '/customers',
  '/skus',
  '/rejections',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + route, (res) => {
      console.log(`[${res.statusCode}] ${route}`);
      resolve(res.statusCode === 200);
    }).on('error', (e) => {
      console.log(`[ERR] ${route}: ${e.message}`);
      resolve(false);
    });
  });
}

(async () => {
  console.log('Testing local routes on http://localhost:3000...\n');
  let success = 0;
  for (const r of routes) {
    const ok = await checkRoute(r);
    if (ok) success++;
  }
  console.log(`\nResults: ${success}/${routes.length} routes responded with HTTP 200 OK.`);
})();
