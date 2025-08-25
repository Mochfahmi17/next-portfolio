import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  categoryProjectId: z.string(),
  skillId: z.array(z.string()).min(1, "Choose at least one skill"),
  image: z
    .file()
    .mime(["image/jpg", "image/jpeg", "image/png", "image/webp"])
    .max(2_000_000),
  linkDemo: z.string().optional(),
  linkRepository: z.string().optional(),
});

export const editProjectSchema = z.object({
  title: z.string().min(1, "Name is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  categoryProjectId: z.string(),
  skillId: z.array(z.string()).min(1, "Choose at least one skill"),
  image: z
    .file()
    .mime(["image/jpg", "image/jpeg", "image/png", "image/webp"])
    .max(2_000_000)
    .optional(),
  linkDemo: z.string().optional(),
  linkRepository: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required."),
  levelId: z.string().min(1, "Level is required."),
  icon: z
    .file("Icon image required.")
    .mime([
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ])
    .max(2_000_000),
});

export const editSkillSchema = z.object({
  name: z.string().min(1, "Name is required."),
  levelId: z.string().min(1, "Level is required."),
  icon: z
    .file("Icon image required.")
    .mime([
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ])
    .max(2_000_000)
    .optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required."),
  certificateImage: z
    .file("Certificate image is required.")
    .mime(["image/jpg", "image/jpeg", "image/png", "image/webp"])
    .max(2_000_000),
});

export const editCertificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required."),
  certificateImage: z
    .file("Certificate image is required.")
    .mime(["image/jpg", "image/jpeg", "image/png", "image/webp"])
    .max(2_000_000)
    .optional(),
});

export const editUserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  cv: z
    .file("CV file is required.")
    .mime("application/pdf")
    .max(2_000_000)
    .optional(),
  profile: z
    .file("Profile is required.")
    .mime(["image/jpg", "image/jpeg", "image/png", "image/webp"])
    .max(2_000_000)
    .optional(),
});
