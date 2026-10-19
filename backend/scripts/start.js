const { spawnSync } = require('node:child_process')
const path = require('node:path')
const backendDir = path.resolve(__dirname, '..')
function prepareDatabase() {
    // Run on every startup, including Render's existing `node index.js` command.
    // migrate deploy only applies pending, checked-in migrations; it never resets.
    for (const args of [
        [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'],
        [path.join(backendDir, 'prisma/seed.js')],
    ]) {
        const result = spawnSync(process.execPath, args, { cwd: backendDir, env: process.env, stdio: 'inherit' })
        if (result.error || result.status !== 0) throw new Error('Database setup failed')
    }
}
module.exports = { prepareDatabase }
