import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {z} from "zod";

export const orderRouter = createTRPCRouter({
  getOrder: protectedProcedure.input(z.object({
    orderId: z.string()
  })).query(async ({ctx, input}) => {
    try {
      const {orderId: id} = input;
      const order = await ctx.prisma.order.findUnique({where: {id}, include: {items: {include: {product: true}}}});
      return {
        code: 200,
        data: order
      }
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        message: 'internal server error'
      }
    }
  })
});