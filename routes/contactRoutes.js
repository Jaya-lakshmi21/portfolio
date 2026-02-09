// const express = require("express");
// const router = express.Router();
// const { sendContactEmail } = require("../controllers/contactController");

// router.post("/send", sendContactEmail);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../controllers/contactController");
const { validateContact } = require("../middleware/validationMiddleware");

router.post("/send",
  (req, res, next) => {
    console.log("ROUTE HIT ✅");
    next();
  },
  validateContact,
  sendContactEmail
);

module.exports = router;
