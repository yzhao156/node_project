const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceInfo = require('./modules/replaceTemplate');

/** reading data */
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCards = fs.readFileSync(`${__dirname}/templates/template-cards.html`, 'utf-8');
const tempProd = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productObj = JSON.parse(productData);

// const slugs = productObj.map(product => slugify(product.productName, { lower: true }));

/** server */
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    switch (pathname) {
        // Overview Page
        case ('/'):
        case ('/overview'):
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end(tempOverview.replace('$$%PRODUCT_CARDS%$$', productObj.map(product => replaceInfo(tempCards, product)).join('')));
            break;
        // Product Page
        case ('/product'):
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end(replaceInfo(tempProd, productObj[query.id]));
            break;
        // API Page
        case ('/api'):
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(productData);
            break;
        // Exceptions
        default:
            // headers before send
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.end('<h1>unsupported2</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});