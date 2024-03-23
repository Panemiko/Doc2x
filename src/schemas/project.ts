import { z } from "zod";

export const projectTitleSchema = z.string().trim().min(1).max(1024);

export const projectAbstractSchema = z.string().trim().min(1).max(4096);
