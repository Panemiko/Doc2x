import { z } from "zod";

export const userNameSchema = z.string().trim().min(1).max(255);

export const userEmailSchema = z.string().trim().email();
