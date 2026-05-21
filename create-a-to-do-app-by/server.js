const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 8000;
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript"
};

http.createServer((request, response) => {
  const requestedPath = request.url === "/" ? "index.html" : decodeURIComponent(request.url);
  const filePath = path.join(root, requestedPath);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "text/plain"
    });
    response.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`TaskFlow app running at http://127.0.0.1:${port}`);
});
