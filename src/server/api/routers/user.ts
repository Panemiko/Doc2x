import { modelIdSchema } from "@/schemas/global";
import { userNameSchema } from "@/schemas/user";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(z.object({ userId: modelIdSchema }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    }),
  update: protectedProcedure
    .input(
      z.object({
        name: userNameSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        data: {
          name: input.name,
        },
        where: {
          id: ctx.user.id,
        },
      });

      return user;
    }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.delete({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
