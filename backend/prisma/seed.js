const { prisma } = require('../config/database')
async function seed() {
    for (const name of ['Web Development', 'Data Science', 'Programming', 'Design', 'Business']) {
        await prisma.category.upsert({ where: { name }, update: {}, create: { name, description: `Explore ${name} courses` } })
    }
}
if (require.main === module) seed().catch(error => {
    console.error('Category seed failed:', error.code || 'Database unavailable')
    process.exitCode = 1
}).finally(() => prisma.$disconnect())
module.exports = { seed }
