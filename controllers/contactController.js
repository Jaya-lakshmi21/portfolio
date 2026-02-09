const db = require("../db");
const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
  console.log("Incoming request body:", req.body);

  try {
    const { name, email, message } = req.body;

    // 1️⃣ Save to MySQL
    const result = await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    console.log("MySQL Insert Success:", result);

    // 2️⃣ Setup Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    console.log("Transporter created");

    // 3️⃣ Send Email
    const mailResult = await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Portfolio Contact Message",
      text: `
New Portfolio Message

Name: ${name}
Email: ${email}
Message: ${message}
`
    });

    console.log("Mail Sent:", mailResult);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};
