import {createTRPCRouter} from "~/server/api/trpc";
import {exampleRouter} from "~/server/api/routers/example";
import {userRouter} from "~/server/api/routers/user";
import {assetRouter} from "~/server/api/routers/asset";
import {orderRouter} from "~/server/api/routers/order";
import {bankRouter} from "~/server/api/routers/bank";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  asset: assetRouter,
  order: orderRouter,
  bank: bankRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
