const nodemailer = require("nodemailer");
const MailGen = require('mailgen');
const { MailGen: MailGenConfig } = require('./db');
require('dotenv').config();

async function mailer(to, subject, body) {

  // configuracion con datos de accesso a la cuenta de envio (traidos de la variable de entorno)
  const mailConfig = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  // TRANSPORTADOR DEL EMAIL RECIBE LOS DATOS DE CONFIGURACION
  const transporter = nodemailer.createTransport(mailConfig);

  // CREA LA INSTANCIA QUE PERMITE FORMATEAR EL CONTENIDO DEL MENSJAE
  const mailGenConfig = await MailGenConfig.findByPk(1);
  let mailGen = new MailGen({
    theme: mailGenConfig.theme,
    product: {
      name: mailGenConfig.productName,
      link: mailGenConfig.productLink,
      copyright: mailGenConfig.productCopyright,
    }
  });

  // GENERACION DE LA ESTRUCTURA DEL EMAIL
  let emailHTML = mailGen.generate({ body });

  // FUNCION QUE ENVIA EL MENSAJE, RECIBE LA PLANTILLA CON TODOS LOS DATOS PARA EL USUARIO
  const sentMessageInfo = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: emailHTML,
  });
  // console.log(`(^-^) Email sent to ${to}`, sentMessageInfo);
}

module.exports = mailer;
