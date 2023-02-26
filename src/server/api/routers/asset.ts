import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {z} from "zod";
import {env} from "~/env.mjs";
import {randomUUID} from "crypto";
import {minio} from "~/utils/minio";

export const assetRouter = createTRPCRouter({
  createPresignedUrl: protectedProcedure.input(z.object({
    contentType: z.string(),
    filename: z.string(),
  })).mutation(async ({input, ctx}) => {
    const {filename} = input;
    const key = `users/${ctx.session.user.id}/${randomUUID()}-${filename}`;
    const url = await minio.presignedPutObject(env.MINIO_BUCKET_NAME, key);
    return {
      url,
      key
    }
  })
})