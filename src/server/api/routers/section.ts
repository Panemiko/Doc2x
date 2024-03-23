import { modelIdSchema } from "@/schemas/global";
import { sectionContentSchema, sectionTitleSchema } from "@/schemas/section";
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
  update: protectedProcedure
    .input(
      z.object({
        sectionId: modelIdSchema,
        title: sectionTitleSchema,
        content: sectionContentSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.section.update({
        where: {
          id: input.sectionId,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        projectId: modelIdSchema,
        title: sectionTitleSchema,
        content: sectionContentSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.section.create({
        data: {
          projectId: input.projectId,
          title: input.title,
          content: input.content,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ sectionId: modelIdSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.section.delete({
        where: {
          id: input.sectionId,
        },
      });
    }),
  byId: protectedProcedure
    .input(z.object({ sectionId: modelIdSchema }))
    .query(async ({ ctx, input }) => {
      const section = await ctx.db.section.findFirst({
        where: {
          id: input.sectionId,
        },
      });

      if (!section) {
        return null;
      }

      return section;
    }),
});
