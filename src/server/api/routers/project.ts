import { modelIdSchema } from "@/schemas/global";
import { projectAbstractSchema, projectTitleSchema } from "@/schemas/project";
import { sectionTitleSchema } from "@/schemas/section";
import { userEmailSchema } from "@/schemas/user";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: projectTitleSchema,
        abstract: projectAbstractSchema.optional(),
        sectionTitles: sectionTitleSchema.array(),
        collaboratorEmails: userEmailSchema.array(),
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

      await ctx.db.collaboration.create({
        data: {
          projectId: project.id,
          userId: ctx.user.id,
        },
      });

      for (const sectionTitle of input.sectionTitles) {
        await ctx.db.section.create({
          data: {
            title: sectionTitle,
            projectId: project.id,
            content: "",
          },
        });
      }

      for (const collaboratorEmail of input.collaboratorEmails) {
        const user = await ctx.db.user.findFirst({
          where: {
            email: collaboratorEmail,
          },
        });

        if (!user) {
          continue;
        }

        await ctx.db.collaboration.create({
          data: {
            projectId: project.id,
            userId: user.id,
          },
        });
      }

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
  update: protectedProcedure
    .input(
      z.object({
        projectId: modelIdSchema,
        title: projectTitleSchema,
        abstract: projectAbstractSchema.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findFirst({
        where: {
          id: input.projectId,
        },
      });

      if (!project) {
        return null;
      }

      return ctx.db.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          title: input.title,
          abstract: input.abstract,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ projectId: modelIdSchema }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.project.delete({
        where: {
          id: input.projectId,
        },
      });
    }),
});
