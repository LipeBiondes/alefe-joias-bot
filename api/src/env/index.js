/* eslint-disable no-undef */
require("dotenv").config();
const { z } = require("zod");

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  MYSQL_DB: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}

const env = _env.data;

module.exports = env;
