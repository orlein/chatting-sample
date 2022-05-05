/**
 * app.js
 *
 * 이 파일은 node.js + express.js로 만들 때 핵심입니다.
 * 이 서버가 어떤 역할을 필요로 하는지, 어떤 기술을 필요로하는지에 대한 설명을 제공할 수 있습니다.
 *
 * 모듈을 require로 가져와서, `app.use`로 모듈을 사용할 수 있습니다.
 */

const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

const routes = require("./routes");
const connectDatabase = require("./database/connectDatabase");

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const init = () => {
  nextApp.prepare().then(() => {
    const expressServer = express();
    expressServer.use(cookieParser());
    expressServer.use(express.json()); // for parsing application/json
    expressServer.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    connectDatabase();

    expressServer.use(routes);
    expressServer.get("*", (req, res) => handle(req, res));

    expressServer.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
};

init();
