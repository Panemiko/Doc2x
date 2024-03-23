import { z } from "zod";

export const sectionTitleSchema = z.string().trim().min(1).max(1024);

export const sectionContentSchema = z.string().trim().max(100000000);
