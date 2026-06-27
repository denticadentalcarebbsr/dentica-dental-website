import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.email("Please enter a valid email").optional().or(z.literal("")),
  service: z.string().optional(),
  preferred_window: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, { error: "You must consent to be contacted" }),
  honeypot: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  cover_image_url: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  status: z.enum(["draft", "published"]),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
