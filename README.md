Node.js 프로젝트 구축하는 방법

# 1. 어떤 Node.js 프로젝트를 구축할 지 정해야 합니다

## 1. 주요 framework

1. *express*
2. koa
3. fastify
4. nest.js
5. strapi
6. 기타

이 밖에도 많이 있습니다

## 2. package manger

1. *npm*
2. yarn
3. pnpm

대체로 이 3개에서 벗어나지 않습니다

## 3. 폴더 구조

1. *entity - (repository - ) service - controller*
2. 자유

## 4. 사용할 version control system

1. *git*
2. svn
3. 기타

git 이외에는 추천하지 않습니다.

## 5. 사용할 문서 프레임워크

1. swagger
2. postman
3. 기타
4. *없음*

swagger를 추천하나, 지금 상황에선 필요없습니다.

## 6. 사용할 개발언어

1. JavaScript
2. TypeScript
3. Kotlin
4. 기타

Node.js는 js로만 만들수 있는것이 아닙니다. 여러 언어가 있을 수 있으나, 주로 TypeScript를 추천하는 편입니다. JavaScript로도 충분히 생산성있는 개발이 가능하나, 이 경우 최대한 신경써서 코딩하는것이 필요합니다.

# 2. 프로젝트의 틀을 구축해야합니다.

## 1. `.gitignore`

gitignore.io 들어가서 Node 검색하고 전부 베끼면 됩니다.

## 2. npm `package.json`

> $ npm init -y 

## 3. express 설치

> $ npm i express

## 4. 초기 구동 소스코드

`src` 폴더를 만들고, `app.js` 파일을 만듭니다. 이후에,

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(3000);
```

내용을 붙여넣습니다.

## 5. `scripts` 수정

```json
"scripts": {
  "start": "node src/app.js"
}
```
그대로 집어넣습니다.

## 6. 실행과 확인

> npm start

이렇게 실행 후, 크롬에서 http://localhost:3000 에 접속하여 hello world를 직접 봅니다.

## 7. git commit

> git config user.name

이렇게 실행하여, 자기 이름이 나오는지 봅시다. 없다면 아래와 같이 실행합니다.

> git config user.name "<커밋에 들어갈 이름>"

<커밋에 들어갈 이름> 부분에 자기 이름을 집어넣습니다.

> git commit config user.name "Park Changjun"

이런 식입니다. 

똑같이 이메일도 확인해줍니다.

> git config user.email

이렇게 실행하여 자기 이메일이 나오는지 봅시다. 없다면 아래와 같이 실행합니다.

> git config user.email "<이메일>"

마찬가지로

> git config user.email "pcj9024@gmail.com"

이런 식입니다. 이렇게 등록하지 않으면 커밋이 되지 않습니다.

커밋은 아래와 같이 실행합니다.

> git add -A

> git commit -m "initial commit"

이렇게 하면, initial commit이라는 이름으로 커밋이 등록됩니다.

주의하셔야 할 점은 `node_modules` 폴더가 커밋에 올라가지 말아야한다는 점입니다. 

## 8. github를 이용한 소스공유

github에서 repository를 만듭니다. 만드는 방법은 생략합니다.

repository를 만든 이후, 

> git remote add origin <깃허브 주소>

입력하여 `origin`이라는 이름으로 remote를 등록합니다. 그러고나서

> git push origin main

을 입력하여 initial commit을 push하도록 합니다.

## 9. 공유받은 사람을 위한 가이드

> npm install

을 통해, dependency를 모두 다운받은 후에 

> npm start

로 개발을 시작합시다.

# 3. database와 controller를 추가해봅시다

## 1. sqlite

sqlite는 file에 database를 저장할 수 있는 작은 database engine으로써, 지금과 같은 작은 데모 프로젝트에 적합합니다. 그러나 sqlite는 수천~수백만명의 유저를 감당하기위한 서버의 database로써 쓰기에는 매우 부적절하므로, 혹시라도 이런 계획이 있다면 oracle, postgresql, mysql(mariadb) 등을 고려해야합니다.

> npm i sqlite3

## 2. Data access layer

db의 종류에 관계없이, 서버는 db에 접속할 수 있어야 합니다. 이 프로젝트에서만큼은 sqlite를 선택하였기때문에 sqlite에 접속할 수 있도록 해야합니다. 접속은 세단계로 이뤄집니다.

1. node.js가 구동될 때 접속가능여부 체크
2. 접속가능할 때, 필요한 테이블이 존재하는지 체크하고 있으면 생성 (Data definition language 실행)
3. 테이블이 있을 때, 필요한 상황에서 각 테이블의 데이터를 쿼리를 실행하여 조작 (Data manipulation language 실행)

이 기능을 구현할 때 주의할 점은, *절대로 이 layer가 business와 섞이지 말아야 할 것* 입니다.

## 3. Create Table

테이블이 없으면 만들고, 있으면 아무것도 안하는 코드를 만듭시다.

`createDatabase.js` 에서 `createTable` 함수를 만들고, 이를 실행하면 그런 기능을 할 수 있게 만듭니다.

## 4. Connection Pool

서버와 DB사이의 연결에는 Connection Pool이 있을 수 있습니다. sqlite를 사용할때는 아직은 고려할 필요는 없으나, 알아두면 좋습니다. 서버와 DB사이의 Connection은 상황에 따라 비용이 높을 수도 있는데, 이를 적절히 컨트롤할때 꼭 필요합니다. 이 프로젝트에서는 그냥 필요할 때 connection을 열고 닫습니다. 보통의 경우 매우 비효율적인 방법입니다.

## 5. Repository Pattern

DB에 접근할 때, DB에 직접 접근하여 데이터를 가져오는 부분을 Repository로 정의하고 이를 적절히 분리하여 사용하는것을 말합니다. 이렇게 되면 나중에 sqlite에서 postgres로 바꾸거나 했을때에도 크게 문제 없는 소스코드를 작성할 수 있습니다.

지금 단계에서는 Repository는 잠시 뒤에 구현하도록 하고, 먼저 Controller에 직접 DB연결을 하여 데이터를 가져올 수 있게 해봅시다.

## 6. (준비단계) useDatabase

Repository를 사용하기 전에, `useDatabase` 함수를 간단히 작성합니다. 이 함수의 역할은 단순히 db에 접속하여, 원하는 쿼리를 원하는 parameter와 함께 비동기 실행하고 그에 대한 결과를 return합니다.

```javascript
async function useDatabase(query, params) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      "database.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    db.all(query, params, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(result);
    });
  });
}
```

## 7. Controller에서 Database 접근

`/api/v1/user` 에 접속하면 모든 유저를 가져올 수 있게끔 한다면,

```javascript
router.get("/api/v1/user", async (req, res) => {
  const users = await useDatabase(`SELECT * FROM users`, [], (err, rows) => {});
  res.send(users);
});
```

이런 꼴이 되는것이 가장 보기 좋습니다. 

혹시 유저를 추가하는것을 보고싶다면, 임시 코드로 다음과 같이 짜야합니다.

```javascript
router.post("/api/v1/user", async (req, res) => {
  const users = await useDatabase(
    `INSERT into users (name, email, password) values ('name1', 'email1@email.com', 'p@ssw0rd')`,
    [],
    (err, rows) => {}
  );

  res.send("add user");
});
```

그러나 이 코드를 실제로 어떤식으로 정리하여 넣을지가 문제입니다. 다음 챕터에서 설명합니다.

# 4. controller들을 정리해봅시다

## 1.`app.js` 정리

`app.js`에서 controller가 들어갈 부분들을 routes로 묶습니다. `routes.js`에서 경로에 관한걸 모두 다루면, `app.js`는 되도록 변화가 없어지기 때문에 "이 파일이 변화하는 상황"을 추적할 때 매우 편리해집니다.

## 2. `routes.js` 정리
