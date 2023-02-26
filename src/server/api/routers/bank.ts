import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";

export const bankRouter = createTRPCRouter({
  getAccounts: protectedProcedure.query(async ({ctx}) => {
    try {
      const accounts = await ctx.prisma.bankAccount.findMany({where: {userId: null}});
      return {
        code: 200,
        data: accounts,
      }
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        message: 'internal server error',
      }
    }
  })
});