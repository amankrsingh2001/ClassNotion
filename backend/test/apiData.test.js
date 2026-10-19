const { test } = require('node:test')
const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const { apiData } = require('../utils/apiData')

test('API serializer keeps legacy IDs, enrollment IDs and progress without credentials', () => {
    const result = apiData({ id: 'user', accountType: 'Student', password: 'secret', token: 'reset-secret',
        additionalDetails: { id: 'profile', contactNumber: '0123456789' },
        enrollments: [{ course: { id: 'course', instructorId: 'teacher', categoryId: 'cat', enrollments: [{ userId: 'user' }] } }],
        courseProgress: [{ id: 'progress', completedVideo: [{ subSectionId: 'lesson' }] }],
    })
    assert.equal(result._id, 'user')
    assert.equal(result.additionalDetails.contactNumber, '0123456789')
    assert.deepEqual(result.courses[0].studentsEnrolled, ['user'])
    assert.equal(result.courses[0].instructor, 'teacher')
    assert.equal(result.courses[0].Category, 'cat')
    assert.deepEqual(result.courseProgress[0].completedVideo, ['lesson'])
    assert.equal(result.password, undefined)
    assert.equal(result.token, undefined)
})

test('Neon pooled URL derives a direct migration URL, with explicit override supported', () => {
    const check = (database, direct, expected) => {
        const env = { ...process.env, DATABASE_URL: database }
        delete env.DIRECT_URL
        if (direct) env.DIRECT_URL = direct
        const result = spawnSync(process.execPath, ['-e', `require('./config/env'); if(process.env.DIRECT_URL !== ${JSON.stringify(expected)}) process.exit(1)`], { cwd: require('node:path').resolve(__dirname, '..'), env })
        assert.equal(result.status, 0, result.stderr.toString())
    }
    check('postgresql://user:pass@ep-test-pooler.us-east-2.aws.neon.tech/db?sslmode=require', null, 'postgresql://user:pass@ep-test.us-east-2.aws.neon.tech/db?sslmode=require')
    check('postgresql://user:pass@localhost:5432/db', null, 'postgresql://user:pass@localhost:5432/db')
    check('postgresql://user:pass@ep-test-pooler.us-east-2.aws.neon.tech/db', 'postgresql://user:pass@custom/db', 'postgresql://user:pass@custom/db')
})
