import { modelIdSchema } from "@/schemas/global";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const sectionRouter = createTRPCRouter({
  byProject: protectedProcedure
    .input(z.object({ projectId: modelIdSchema }))
    .query(async ({ ctx, input }) => {
      const sections = await ctx.db.section.findMany({
        where: {
          projectId: input.projectId,
        },
      });

      return sections;
    }),
});
