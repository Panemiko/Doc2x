import { modelIdSchema } from "@/schemas/global";
import { projectAbstractSchema, projectNameSchema } from "@/schemas/project";
import { sectionTitleSchema } from "@/schemas/section";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: projectNameSchema,
        abstract: projectAbstractSchema.optional(),
        sectionTitles: sectionTitleSchema.array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          title: input.title,
          abstract: input.abstract,
          ownerId: ctx.user.id,
        },
      });

      input.sectionTitles.forEach((sectionTitle) => {
        void ctx.db.section.create({
          data: {
            title: sectionTitle,
            projectId: project.id,
            content: "",
          },
        });
      });

      await ctx.db.collaboration.create({
        data: {
          projectId: project.id,
          userId: ctx.user.id,
        },
      });

      return project;
    }),
  byId: protectedProcedure
    .input(z.object({ projectId: modelIdSchema }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findFirst({
        where: {
          id: input.projectId,
        },
      });

      if (!project) {
        return null;
      }

      return project;
    }),
});
