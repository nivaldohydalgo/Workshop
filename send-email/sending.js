const nodemailer = require('nodemailer')

const environment = require('./.env'); 

// Email de Envio
// Pesquisar no Google: "SMTP Gmail"
let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,     // true se tiver SSL ou TLS
    auth: {
        user: environment.SENDEREMAIL,
        pass: environment.SENDERPASSWORD         // app password da conta Gmail
    }
})

// Email destinatário
transporter.sendMail({
    from: "NH News <" + environment.SENDEREMAIL + ">",
    to: environment.RECIPIENTEMAIL,
    subject: "Coloque aqui o titulo do Email",
    // text: "segundo teste de envio de email",
    // em vez do text pode colocar html
    html: "Aqui <i>você coloca</i> seu <b>html</b> com tags<br><br>NH News"
}).then(message => {
    console.log(message)
}).catch(err => {
    console.log(err)
})

