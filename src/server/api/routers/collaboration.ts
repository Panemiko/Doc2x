import { modelIdSchema } from "@/schemas/global";
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
});
