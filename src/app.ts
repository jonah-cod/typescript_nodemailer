import express, { Application, Request, Response} from 'express';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import ejs from 'ejs'
dotenv.config({path: __dirname+'/.env' })

const app: Application = express()
const PORT= (process.env.PORT as string | undefined) || 4000;

const sendEmail = async()=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
        user: process.env.emailUser, 
        pass: process.env.passEmail 
        },
    });

    const name = "John Spade"
	// ejs currently not working
   let data = ejs.renderFile('C:/Users/ADMIN/Desktop/nodemailler/src/templates/mail.ejs', {name}, (err: any, data: any)=>{
        if (err) {
            return console.log(err)
        }
        return data;
        
    })
    const options = {
        from: `"Jonathan Mwaniki" <${process.env.emailUser}>`,
        to: "jonathan.mwaniki12@gmail.com, baz@example.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: data}
        return await transporter.sendMail(options);
        
}
app.get('/', (req: Request, res: Response)=>{
    res.send("Welcome to 127.0.0.1")
})


app.get('/mail', async(req: Request, res: Response)=>{
    sendEmail().then(info=>{
        if (info.accepted.length) {
            console.log(info.messageId)
            res.send("Email send successfully")
        }
    }).catch(error=>console.log(error))
    
})

app.listen(PORT, ()=>console.log(`PORT: ${PORT} listening...`))