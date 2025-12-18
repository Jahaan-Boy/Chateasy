import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmails= async (email,name, clientUrl)=>{
    const {data, error}=await resendClient.emails.send({
        from: `${sender.email} <${sender.email}>`,
        to: email,
        subject:"Welcome to our chat app",
        html: createWelcomeEmailTemplate(name, clientUrl)
    })
    if(error){
        console.log("Error in sending email",error.message);
        throw new Error('Failed to send email');
    }

    return data;

}