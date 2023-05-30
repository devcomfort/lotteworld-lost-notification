import joi from "joi";

interface User {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  is_email_authenticated: boolean;
  is_phone_authenticated: boolean;
  created_at: string;
  read_docs: number[];
}

const LoginDataSchema = joi.object<Pick<User, "email" | "password">>({
  email: joi.string().email(),
  password: joi.string(),
});

const PublicUserSchema = LoginDataSchema.append<Omit<User, "user_id">>({
  name: joi.string(),
  phone: joi.string(),
  is_email_authenticated: joi.boolean().optional(),
  is_phone_authenticated: joi.boolean().optional(),
  created_at: joi.string().isoDate(),
  read_docs: joi.array().items(joi.number().required()),
});

const UserSchema = PublicUserSchema.append<User>({
  user_id: joi.number().min(1),
});

const users: User[] = [
  {
    user_id: 1,
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    password: "password1",
    is_email_authenticated: true,
    is_phone_authenticated: true,
    created_at: "2023-01-01T00:00:00",
    read_docs: [1, 2, 3],
  },
  {
    user_id: 2,
    name: "김철수",
    email: "kim@example.com",
    phone: "010-2345-6789",
    password: "password2",
    is_email_authenticated: false,
    is_phone_authenticated: true,
    created_at: "2023-01-02T00:00:00",
    read_docs: [4, 5, 6],
  },
  {
    user_id: 3,
    name: "이영희",
    email: "lee@example.com",
    phone: "010-3456-7890",
    password: "password3",
    is_email_authenticated: true,
    is_phone_authenticated: false,
    created_at: "2023-01-03T00:00:00",
    read_docs: [7, 8, 9],
  },
  {
    user_id: 4,
    name: "박영수",
    email: "park@example.com",
    phone: "010-4567-8901",
    password: "password4",
    is_email_authenticated: false,
    is_phone_authenticated: false,
    created_at: "2023-01-04T00:00:00",
    read_docs: [10, 11, 12],
  },
  {
    user_id: 5,
    name: "장미란",
    email: "jang@example.com",
    phone: "010-5678-9012",
    password: "password5",
    is_email_authenticated: true,
    is_phone_authenticated: true,
    created_at: "2023-01-05T00:00:00",
    read_docs: [13, 14, 15],
  },
];

export { type User, users, LoginDataSchema, UserSchema, PublicUserSchema };
