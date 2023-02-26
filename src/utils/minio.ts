/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */
import {Client} from "minio";
import {env} from "~/env.mjs";

export const minio: Client = new Client({
  endPoint: env.MINIO_ENDPOINT,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_ACCESS_SECRET
})