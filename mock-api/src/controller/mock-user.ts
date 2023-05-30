import Router from "koa-router";
import {
  queryUsersByID,
  queryUsersByName,
  queryUsersByEmail,
  queryUsersByPhone,
  SignIn,
  SignUp,
  SignFailed,
} from "../services/mock-user.js";
import { PublicUserSchema, User, UserSchema } from "../model/mock-user.js";

const router = new Router();

router.get("/users/id/:id", (ctx, next) => {
  ctx.response.body = queryUsersByID(Number(ctx.params.id));
});

router.get("/users/name/:name", (ctx, next) => {
  ctx.response.body = queryUsersByName(ctx.params.name);
});

router.get("/users/email/:email", (ctx, next) => {
  ctx.response.body = queryUsersByEmail(ctx.params.email);
});

router.get("/users/phone/:phone", (ctx, next) => {
  ctx.response.body = queryUsersByPhone(ctx.params.phone);
});

router.post("/users", async (ctx, next) => {
  const body = ctx.request.body as User;

  const IsUser = PublicUserSchema.validate(body);

  if (IsUser.error) {
    ctx.status = 400;
    ctx.body = {
      status: "failed",
      msg: IsUser.error.message,
    } satisfies SignFailed;

    return;
  }

  const signUp = SignUp(body);

  ctx.response.body = signUp;
});

export { router as UserRouter };
