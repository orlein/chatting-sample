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