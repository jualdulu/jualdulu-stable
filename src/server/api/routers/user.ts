/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-template-expressions */
import {z} from "zod";

import {createTRPCRouter, protectedProcedure,} from "~/server/api/trpc";
import * as code from "~/utils/code";

export const userRouter = createTRPCRouter({
  register: protectedProcedure.input(z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string(),
    image: z.any().optional(),
    facebook: z.string().optional(),
    address: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    postalCode: z.string().optional(),
  })).mutation(async ({ctx, input}) => {
    try {
      const {image, email, firstName, lastName, phone, facebook, province, city, district, postalCode, address} = input;
      // Update user info
      await ctx.prisma.user.update({
        where: {id: ctx.session.user.id}, data: {
          name: `${firstName} ${lastName}`,
          image,
          email,
          role: 'PUBLIC',
        }
      })
      // Create user contact
      await ctx.prisma.contact.create({
        data: {
          type: 'DROPSHIPER',
          firstName,
          lastName,
          email,
          phone,
          facebook,
          address,
          province,
          city,
          district,
          postalCode,
          userId: ctx.session.user.id,
        }
      })
      const setting = await ctx.prisma.setting.findUnique({where: {key: 'dropshiper-registration-product-id'}});
      const product = await ctx.prisma.product.findUnique({where: {id: setting?.value}, include: {variants: true}});
      if (!product || !product.variants[0]) return {
        code: 404,
        message: "product not found"
      }
      // Create new transaction
      const order = await ctx.prisma.order.create({
        data: {
          userId: ctx.session.user.id,
          date: new Date(),
          code: code.generate(),
          amount: product.variants[0].discountPrice || product.variants[0].price,
          status: 'AWAITING_PAYMENT',
          items: {
            create: [
              {
                productId: product.id,
                productName: product.name,
                price: product.variants[0].discountPrice || product.variants[0].price,
                quantity: 1
              }
            ]
          }
        }
      })
      return {
        code: 201,
        data: order,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        message: 'internal server error',
      }
    }
  }),
});
