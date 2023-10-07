const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "incidenciashive@gmail.com",
    pass: "qohm gash aeoc rxhq",
  },
  tls: {
    rejectUnauthorized: false, // No recomendado para producción
  },
});

function sendTicketEmail(ticketInfo) {
  // HTML para el correo

  let emailHtml = `
  <html>
            <head>
            <style>
            .container {
                width: 600px;
                margin: auto;
                background-color: #f2f2f2;
                border-radius: 8px;
                padding: 20px;
            }
            .header {
                background: linear-gradient(90deg, #1d487a, #153356);
                padding: 20px;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                text-align: center;
            }
            .header img {
                width: 100px;
            }
            .header h2 {
                color: white;
                margin: 10px 0 0 0;
            }

            .body {
                padding: 20px;
            }
            .body p {
                color: #153356;
                font-size: 16px;
                margin-bottom: 10px;
            }
            .footer {
                background: linear-gradient(90deg, #1d487a, #153356);
                color: white;
                text-align: center;
                padding: 20px;
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
            }
        </style>
    </head>
    <body>
                <div class="container">
                    <div class="header">
                        <img src="https://i.ibb.co/WnJc6zj/logoHive.png" alt="Company Logo" />
                        <h2>Nuevo Ticket de Soporte</h2>
                        <h2>${ticketInfo.numeroSolicitud}</h2>
                    </div>
                    <div class="body">
          <p><strong>Nombre:</strong> ${ticketInfo.nombre}</p>
          <p><strong>Email:</strong> ${ticketInfo.email}</p>
          <p><strong>Centro:</strong> ${ticketInfo.centro}</p>
          <p><strong>Aplicación:</strong> ${ticketInfo.aplicacion}</p>
          <p><strong>Tipo:</strong> ${ticketInfo.tipo}</p>
          <p><strong>Criticidad:</strong> ${ticketInfo.criticidad}</p>
          <p><strong>Descripción:</strong> ${ticketInfo.descripcion}</p>          
          </div>
          <div class="footer">
              <p>Hive Mind Solutions | 2023</p>
          </div>
      </div>
  </body>
</html>
`;

  ticketInfo.imageUrls.forEach((imageUrl) => {
    // Genera etiquetas <img> en el correo HTML
    emailHtml += `<img src="${imageUrl}" alt="Imagen adjunta" style="max-width: 50%;"/>`;
  });

  const mailOptions = {
    from: "incidenciashive@gmail.com",
    to: "slopezcb@gmail.com",
    subject: "Nuevo Ticket de Soporte",
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });
}

module.exports = sendTicketEmail;
