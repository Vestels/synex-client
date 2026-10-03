import jsonServer from "json-server";
import delay from "express-delay";

// .js extension is required because the project uses NodeNext/ESM module resolution.
// TypeScript resolves this to the corresponding .ts source file during development.
import mockDb from "./mock-db.js";
import mockRewrites from "./rewrites.js";
import mockRoutes from "./routes.js";

const JSON_SERVER_PORT = 8080;

const server = jsonServer.create();
const router = jsonServer.router(mockDb);
const middlewares = jsonServer.defaults({ bodyParser: true });
const db = router.db;

server.use(middlewares);
server.use(delay(900, 1100));
server.use(jsonServer.rewriter(mockRewrites));

mockRoutes(server, db);

server.use(router);
server.listen(JSON_SERVER_PORT, () => {
  console.log(`MOCK SERVER is running on ${JSON_SERVER_PORT}`);
});
