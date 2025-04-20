import { z } from 'zod';
import { CvInfoSave } from './helpers/saveLoad';

export const SocialSchema = z.enum([
    'bluesky',
    'email',
    'github',
    'instagram',
    'linkedin',
    'whatsapp',
]);

const ContactSaveSchema = z.object({
    name: z.string().optional(),
    which: SocialSchema.optional(),
});

const CourseSaveSchema = z.object({
    name: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
});

const EducationSaveSchema = z.object({
    name: z.string().optional(),
    what: z.array(CourseSaveSchema).optional(),
});

const SkillSaveSchema = z.object({
    name: z.string().optional(),
    logo: z.string().optional(),
    level: z
        .enum(['Beginner', 'Intermediate', 'Advanced', 'Proficient', 'Expert'])
        .optional(),
});
const LangSaveSchema = z.object({
    name: z.string().optional(),
    level: z
        .enum(['Beginner', 'Intermediate', 'Advanced', 'Proficient', 'Expert'])
        .optional(),
});

const CvInfoSaveSchema = z.object({
    name: z.string().optional(),
    birth: z
        .union([z.string(), z.date()])
        .optional()
        .transform((val) => new Date(val ?? Date.now())),
    about: z.string().optional(),
    contact: z.array(ContactSaveSchema).optional(),
    eduMain: z.array(EducationSaveSchema).optional(),
    eduExtra: z.array(EducationSaveSchema).optional(),
    skills: z.array(SkillSaveSchema).optional(),
    languages: z.array(LangSaveSchema).optional(),
});

export function ValidateCv(data: unknown): data is CvInfoSave {
    const result = CvInfoSaveSchema.safeParse(data);
    return result.success;
}
