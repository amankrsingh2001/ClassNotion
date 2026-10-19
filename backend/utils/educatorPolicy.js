const { z } = require('zod')
const webUrl = z.string().trim().url().max(2000).refine(value => { try { return ['https:', 'http:'].includes(new URL(value).protocol) } catch { return false } }, 'Use an HTTP or HTTPS link')
const year = z.number().int().min(1900).max(new Date().getFullYear())
const professionalProfile = z.object({
    headline: z.string().trim().min(5).max(120),
    about: z.string().trim().min(80).max(6000),
    yearsExperience: z.number().int().min(0).max(80),
    youtubeUrl: z.union([webUrl.refine(value => { try { const host = new URL(value).hostname.toLowerCase(); return ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(host) } catch { return false } }, 'Use a YouTube channel or video link'), z.literal('')]).default(''),
    careerHistory: z.array(z.object({ role: z.string().trim().min(2).max(120), organization: z.string().trim().min(2).max(160), startYear: year, endYear: year.nullable() }).refine(value => value.endYear === null || value.endYear >= value.startYear, 'End year must follow start year')).min(1).max(20),
    certificates: z.array(z.object({ title: z.string().trim().min(2).max(160), issuer: z.string().trim().min(2).max(160), credentialUrl: webUrl })).min(1).max(20),
})
const projectType = z.enum(['React', 'NextJS', 'NodeJS', 'Python', 'Other'])
const lessonFolder = z.object({ parentId: z.string().min(1).nullable().default(null), name: z.string().trim().min(1).max(120).regex(/^[a-zA-Z0-9_][a-zA-Z0-9_. -]*$|^\.[a-zA-Z0-9_][a-zA-Z0-9_. -]*$/, 'Use a file or folder name without slashes').refine(value => !['.', '..'].includes(value)),  })
module.exports = { professionalProfile, projectType, lessonFolder }
