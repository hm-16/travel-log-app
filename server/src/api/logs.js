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
router.post("/delete/:logId",async(req,res,next)=>{
  try {
    await LogEntry.deleteOne({_id:req.params.logId});
  } catch (error) {
    next(error);
  }
  
})
module.exports = router;
