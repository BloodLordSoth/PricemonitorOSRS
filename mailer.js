import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export function sendMail(user, item, val){
    const subject = `Alert! ${item} price has changed`
    const text = `The item ${item} price has changed. It's now ${val}` 

    const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: 'allhailsoth@gmail.com',
            pass: process.env.ACCESS_PASS
        }
    })

    mail.sendMail({
        to: user,
        subject: subject,
        text: text
    }).then(res => {
        console.log('Email has been sent')
    }).catch(err => {
        console.log(err)
    })
}