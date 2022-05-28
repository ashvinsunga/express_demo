const { Router } = require("express");
const router = Router();

// Pug templating engine will render this
router.get("/", (req, res) => {
  return res.render("index", { title: "My Express App", message: "Hello" });
});

module.exports = router;
