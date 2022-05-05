/**
 * app.js
 *
 * 이 파일은 node.js + express.js로 만들 때 핵심입니다.
 * 이 서버가 어떤 역할을 필요로 하는지, 어떤 기술을 필요로하는지에 대한 설명을 제공할 수 있습니다.
 *
 * 모듈을 require로 가져와서, `app.use`로 모듈을 사용할 수 있습니다.
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const connectDatabase = require("./database/connectDatabase");

const app = express();

const init = () => {
  app.use(cookieParser());
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  connectDatabase();

  app.use(routes);

  app.listen(3000);
};

init();
