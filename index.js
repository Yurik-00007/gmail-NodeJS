const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3010

app.use(cors({
    //origin: [`http://localhost:3000/`, 'https://Yurik-00007.github.io'],
    //origin: '*',
    //origin: false,
   //  credentials: true,
   //  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'yurik24101987@gmail.com',
        pass: 'wjlfabhvsjgovyts'
    }
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    // send mail with defined transport object
    const {message, name, contacts} = req.body
    const info = await transporter.sendMail({
            from: 'MY PROFILE PAGE', // sender address
            to: "yurik-007@mail.ru, yurik24101987@gmail.com", // list of receivers
            subject: "HR WANTS ME ✔", // Subject line
            //text: "Hello world?", // plain text body
            html: `
    <b>Сообщение с вашего PROFILE PAGE</b>
    <div>name:${name}</div>
    <div>Contacts:${contacts}</div>
    <div>${message}</div>`, // html body
        })
    ;

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})