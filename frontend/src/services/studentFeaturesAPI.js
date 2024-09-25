const razorpayKey = import.meta.env.VITE_BASE_RAZORPAY_KEY;
import toast from "react-hot-toast";
import { studentEndpoints } from "./api";
import axios from "axios";
import { resetCart } from "../slices/cartSlice";

const { COURSE_PAYMENT_APP, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export async function buyCourse(courses, token, userDetails, navigate, dispatch) {
    const toastId = toast.loading('Loading payment...');

    try {
        // Load Razorpay SDK
        const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!scriptLoaded) {
            toast.error("Failed to load Razorpay SDK");
            return;
        }

        // Initiate the order
        const orderResponse = await axios.post(COURSE_PAYMENT_APP, { courses }, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // Payment options
        const { currency, amount, id: orderId } = orderResponse.data.message;

        const options = {
            key: razorpayKey,
            currency,
            amount,
            order_id: orderId,
            name: 'ClassNotion',
            description: 'Thank you for purchasing the course',
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email
            },
            handler: async function (response) {
                console.log("Payment Response:", response);
                await sendPaymentSuccessEmail(response, orderId, amount, token);
                const paymentData = { ...response, courses, orderId };
                await verifyPayment(paymentData, token, navigate, dispatch);
            },
        };

        // Initialize and open the Razorpay payment modal
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            console.error(response.error);
        });
    } catch (error) {
        console.error("Payment Error:", error);
        toast.error('Could not process payment. Please try again.');
    } finally {
        toast.dismiss(toastId);
    }
}

async function sendPaymentSuccessEmail(response, orderId, amount, token) {
    try {
        await axios.post(SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            headers: { "Authorization": `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Email Sending Error:", error);
        toast.error('Failed to send payment confirmation email.');
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    console.log("this is running")
    try {
        const response = await axios.post(COURSE_VERIFY_API, bodyData, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment successful! You are now enrolled in the course.");
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
    } catch (error) {
        console.error("Payment Verification Error:", error);
        toast.error('Could not verify payment. Please try again.');
    }
}
