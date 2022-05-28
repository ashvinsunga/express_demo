const { Router } = require("express");
// express() will not work, use express.Router instead
const router = Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// Response statuses
// 200 = Ok
// 400 = Bad Request
// 404 = Not found

// Helper functions
const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
};

// Retrieve information

router.get("/", (req, res) => {
  return res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course was not found");
  }
  return res.send(course);
});

// Receiving route parameters or query ?sortBy=name
router.get("/:year/:month", (req, res) => {
  //   res.send(req.params);
  return res.send(req.query);
});

// Register information
router.post("/", (req, res) => {
  // Validate user input
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  return res.send(course);
});

// Update information
router.put("/:id", (req, res) => {
  // Check if the id info does exist
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404 = Not found
    return res.status(404).send("The course was not found");
  }
  // Validate user input
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Update the information
  course.name = req.body.name;
  return res.send(course);
});

// Delete an information
router.delete("/:id", (req, res) => {
  // Check if the id info does exist
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course was not found");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  return res.send(course);
});

module.exports = router;
