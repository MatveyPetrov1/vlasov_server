const nodemailer = require("nodemailer");
const path = require("path");

const videosDirectory = path.join(__dirname, "videos");
const imagesDirectory = path.join(__dirname, "images");

const applicationController = async (req, res) => {
  try {
    const { name, number, service, city } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_GMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.APP_GMAIL,
      to: "vlasov.production.doc@mail.ru",
      subject: "VLASOV PRODUCTION",
      text: `Имя: ${name}
Телефон: ${number}
Услуга: ${service}
Город: ${city}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("nodemailer is OK");
      }
    });

    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Ошибка при отправке заявки",
    });
  }
};

const videoController = (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(videosDirectory, fileName);

    return res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(err.status).end();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const imageController = (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(imagesDirectory, fileName);

    return res.sendFile(filePath, (err) => {
      if (err) {
        return res.status(err.status).end();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { applicationController, videoController, imageController };
