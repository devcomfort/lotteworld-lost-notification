import { User, users } from "../model/mock-user.js";

const queryUsersByID = (id: number) => users.filter((u) => u.user_id === id);
const queryUsersByName = (name: string) => users.filter((u) => u.name === name);
const queryUsersByEmail = (email: string) =>
  users.filter((u) => u.email === email);
const queryUsersByPhone = (phone: string) =>
  // NOTE : 하이푼 포함 여부와 무관하게 탐색할 수 있도록 처리
  users.filter(
    (u) => u.phone.replace(/-/g, "").trim() === phone.replace(/-/g, "").trim()
  );

interface SignSucceed {
  status: "succeed";
  token: string;
}

interface SignFailed {
  status: "failed";
  msg: string;
}

type SignResult = SignSucceed | SignFailed;

const SignUp = (u: Omit<User, "user_id">): SignResult => {
  if (queryUsersByEmail(u.email).length > 0)
    return {
      status: "failed",
      msg: "이미 존재하는 계정입니다",
    };

  if (!(typeof u.password === "string" && u.password.length > 0))
    return {
      status: "failed",
      msg: "비밀번호가 입력되지 않았습니다",
    };

  return {
    status: "succeed",
    token: "jwt-token",
  };
};

const SignIn = (email: string, password: string): SignResult => {
  const users = queryUsersByEmail(email);
  if (users.length <= 0)
    return {
      status: "failed",
      msg: "존재하지 않는 구독자 입니다",
    };
  if (users.length >= 2)
    return {
      status: "failed",
      msg: "중복된 이메일을 가진 계정이 존재합니다",
    };

  if (users[0].email === email && users[0].password === password)
    return {
      status: "succeed",
      token: "jwt-token",
    };

  return {
    status: "failed",
    msg: "비밀번호가 존재하지 않습니다",
  };
};

export {
  type SignSucceed,
  type SignFailed,
  type SignResult,
  queryUsersByID,
  queryUsersByName,
  queryUsersByEmail,
  queryUsersByPhone,
  SignUp,
  SignIn,
};
