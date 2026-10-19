require('dotenv').config()

// Neon provides both pooled and direct URLs. Derive the migration URL so a
// deployment only needs DATABASE_URL; DIRECT_URL remains an optional override.
if (process.env.DATABASE_URL && !process.env.DIRECT_URL) {
    const url = new URL(process.env.DATABASE_URL)
    if (url.hostname.endsWith('.neon.tech')) {
        url.hostname = url.hostname.replace('-pooler.', '.')
    }
    process.env.DIRECT_URL = url.toString()
}
