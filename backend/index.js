require('./config/env')
const express = require('express')
const { prisma } = require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { cloudinaryConnect } = require('./config/clodinaryConfig')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'https://class-notion.vercel.app', 'http://localhost:5173'],
    credentials: true,
}))
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }))
cloudinaryConnect()
app.use('/api/v1/auth', require('./routes/User'))
app.use('/api/v1/profile', require('./routes/Profile'))
app.use('/api/v1/course', require('./routes/Course'))
app.use('/api/v1/payment', require('./routes/Payment'))
app.get('/', (req, res) => res.json({ message: 'Your app is running' }))
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`
        res.json({ success: true, database: 'connected' })
    } catch {
        res.status(503).json({ success: false, database: 'unavailable' })
    }
})
app.use((error, req, res, next) => {
    console.error('Request failed:', error.code || error.message)
    if (res.headersSent) return next(error)
    const status = error.status || ({ P2002: 409, P2025: 404, P2003: 400 }[error.code]) || 500
    const message = error.status ? error.message : ({ 409: 'This record already exists', 404: 'Record not found', 400: 'Invalid related record' }[status]) || 'Internal server error'
    res.status(status).json({ success: false, message })
})
async function start() {
    if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL to your Neon PostgreSQL connection string')
    if (!process.env.JWT_SECRET) throw new Error('Set JWT_SECRET before starting the backend')
    require('./scripts/start').prepareDatabase()
    await prisma.$connect()
    console.log('PostgreSQL connected')
    const server = app.listen(process.env.PORT || 4000, '0.0.0.0', () => console.log('App is running at PORT', process.env.PORT || 4000))
    const shutdown = () => server.close(() => prisma.$disconnect().finally(() => process.exit(0)))
    process.once('SIGTERM', shutdown)
    process.once('SIGINT', shutdown)
    return server
}
if (require.main === module) start().catch(error => {
    // Avoid logging a connection URL or credentials from a Prisma error.
    console.error('Backend startup failed:', error.code || (process.env.DATABASE_URL && process.env.JWT_SECRET ? 'Could not connect to PostgreSQL. Check DATABASE_URL and database availability.' : error.message))
    prisma.$disconnect().finally(() => process.exit(1))
})
module.exports = { app, start }
