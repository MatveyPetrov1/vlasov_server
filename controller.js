const applicationModel = require("./model");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const applicationController = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty) {
      return res.status(400).json({
        message: "Неправильный формат заявки",
      });
    }

    const { name, number, service, city } = req.body;

    const doc = new applicationModel({
      name,
      number,
      service,
      city,
    });

    const application = await doc.save();

    if (!application) {
      return res.status(400).json({
        message: "Ошибка при отправке заявки",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_GMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.APP_GMAIL,
      to: "matveygemot@gmail.com",
      subject: "VLASOV PRODUCTION",
      text: `Имя: ${req.body.name}
Телефон: ${req.body.number}
Услуга: ${req.body.service}
Город: ${req.body.city}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("nodemailer is OK");
      }
    });

    res.json(application);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Ошибка при отправке заявки",
    });
  }
};

module.exports = applicationController;
