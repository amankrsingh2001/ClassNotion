const Razorpay = require('razorpay')
let instance
exports.getRazorpay = () => {
    if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
        const error = new Error('Payments are not configured'); error.status = 503; throw error
    }
    instance ||= new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET })
    return instance
}
