import {Resend} from 'resend'
import 'dotenv/config'

const {EMAIL_FROM,EMAIL_FROM_NAME,RESEND_API_KEY}=process.env;

if(!RESEND_API_KEY){
    throw new Error('RESEND_API_KEY is missing');
}
if (!EMAIL_FROM) {
  throw new Error("EMAIL_FROM is missing");
}

if (!EMAIL_FROM_NAME) {
  throw new Error("EMAIL_FROM_NAME is missing");
}
export const resendClient= new Resend(RESEND_API_KEY);

export const sender = Object.freeze({
  email: EMAIL_FROM,
  name: EMAIL_FROM_NAME,
});