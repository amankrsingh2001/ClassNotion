function fail(res, status, message) {
    return res.status(status).json({ success: false, message })
}
const userId = req => req.user?.id || req.authorization?.id
const handle = fn => async (req, res, next) => {
    try { await fn(req, res, next) } catch (error) { next(error) }
}
module.exports = { fail, userId, handle }
