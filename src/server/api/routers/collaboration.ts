import { modelIdSchema } from "@/schemas/global";
import { userEmailSchema } from "@/schemas/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collaborationRouter = createTRPCRouter({
  byProject: protectedProcedure
    .input(z.object({ projectId: modelIdSchema }))
    .query(async ({ ctx, input }) => {
      const collaborations = await ctx.db.collaboration.findMany({
        where: {
          projectId: input.projectId,
        },
        include: {
          user: true,
        },
      });

      return collaborations;
    }),
  create: protectedProcedure
    .input(
      z.object({
        projectId: modelIdSchema,
        userEmail: userEmailSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.userEmail,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const existingCollaboration = await ctx.db.collaboration.findFirst({
        where: {
          projectId: input.projectId,
          userId: user.id,
        },
      });

      if (existingCollaboration) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await ctx.db.collaboration.create({
        data: {
          projectId: input.projectId,
          userId: user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        collaborationId: modelIdSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.collaboration.delete({
        where: {
          id: input.collaborationId,
        },
      });
    }),
});
