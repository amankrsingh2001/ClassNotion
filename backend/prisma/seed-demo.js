const { prisma } = require('../config/database')
const { seed } = require('./seed')
const { educators } = require('./demoData')
const { randomBytes } = require('node:crypto')
const bcrypt = require('bcrypt')

async function seedDemo() {
    await seed()
    const categories = await prisma.category.findMany()
    for (const educator of educators) {
        const instructorId = `demo-educator-${educator.slug}`
        // No shared demo login password. Educators are fictional display records.
        await prisma.user.upsert({
            where: { id: instructorId }, update: {},
            create: {
                id: instructorId, email: `demo.${educator.slug}@classnotion.invalid`,
                firstName: educator.firstName, lastName: educator.lastName, accountType: 'Instructor',
                password: await bcrypt.hash(randomBytes(32).toString('hex'), 10),
                image: `/assets/educators/${educator.slug}.svg`,
                additionalDetails: { create: { about: educator.about, profession: educator.profession } },
            },
        })
        // Fictional display-only demo educators have no usable shared login.
        await prisma.educatorApplication.upsert({ where: { userId: instructorId }, update: {}, create: { userId: instructorId, status: 'Approved', headline: educator.profession, about: educator.about, reviewNote: 'Fictional demo profile for previewing the course library.' } })
        for (const course of educator.courses) {
            const id = `demo-course-${course.slug}`
            await prisma.course.upsert({
                where: { id }, update: {},
                create: {
                    id, instructorId, categoryId: categories.find(c => c.name === course.category).id,
                    courseName: course.title, courseDescription: `Demo course. ${course.description}`,
                    whatYouWillLearn: course.outcomes, tag: course.tag,
                    price: 0, status: 'Published', thumbnail: `/assets/courses/${course.slug}.svg`,
                    instructions: ['Free demo curriculum', 'Three sample lessons and practice prompts', 'The sample video demonstrates the player; it is not a full course recording.'],
                    courseContent: { create: {
                        id: `${id}-section`, sectionName: 'Start here',
                        subSection: { create: course.lessons.map((title, index) => ({
                            id: `${id}-lesson-${index + 1}`, title, timeDuration: '0',
                            // Reuse the project's existing demo video, served by the frontend.
                            videoUrl: '/assets/Images/banner.mp4',
                            description: `Demo lesson ${index + 1}: ${title}.\n\nPractice: ${course.outcomes.split('\n')[index]}\n\nThis is sample curriculum to explore the learning experience. The video is the platform’s demo clip, not instructional content for this topic.`,
                        })) },
                    } },
                },
            })
        }
    }
    return { educators: educators.length, courses: educators.reduce((n, e) => n + e.courses.length, 0) }
}
if (require.main === module) seedDemo().then(result => console.log('Demo content ready:', result))
    .catch(error => { console.error('Demo seed failed:', error.code || error.name); process.exitCode = 1 })
    .finally(() => prisma.$disconnect())
module.exports = { seedDemo }
