const db = require("../db");

exports.sendContactEmail = async (req, res) => {
  console.log("Incoming request body:", req.body);

  try {
    const { name, email, message } = req.body;

    await db.execute(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    console.log("MySQL Insert Success ✅");

    return res.status(200).json({
      success: true,
      message: "Message saved successfully"
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};
