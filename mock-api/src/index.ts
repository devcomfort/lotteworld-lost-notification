import Koa from "koa";
import Logger from "koa-logger";
import Helmet from "koa-helmet";
import { UserRouter } from "./controller/mock-user.js";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();

// body 파서 적용
app.use(bodyParser());
// 로그 활성화
app.use(Logger());
// 보안 헤더 적용
app.use(Helmet());

router.use("/api", UserRouter.routes());

// 라우터 등록
app.use(router.routes()).use(UserRouter.allowedMethods());

// 서버 실행
app.listen(8080, () => {
  console.log("Koa가 8080 포트에서 실행 중입니다.");
});
