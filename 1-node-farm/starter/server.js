const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);

const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);

const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        const cardsHtml = dataObj
            .map((el) => replaceTemplate(tempCard, el))
            .join("");
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);
    } else if (pathname === "/product") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    } else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        res.end(dataObj);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "Hello, World!",
        });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(8080, "127.0.0.1", () => {
    console.log(`Server started on 127.0.0.1:8080`);
});
