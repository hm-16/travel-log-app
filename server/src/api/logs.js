const { Router } = require("express");

const LogEntry = require("../models/LogEntry");

const router = Router();

router.get("/:email", async (req, res,next) => {
  try {
    const entries = await LogEntry.find({email: req.params.email});
    if(entries) return res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    return res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
