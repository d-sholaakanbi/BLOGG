// crud
const Job = require("../models/job");

const getJournals = async (req, res) => {
  try {
    const job = await Job.find({ createdBy: req.user.userId });
    res.status(200).json({
      success: true,
      noOfJobs: job.length,
      job,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getJournal = async (req, res) => {
  const {
    user: { userId },
    params: { journalId },
  } = req;
  try {
    const job = await Job.findOne({ createdBy: journalId, _id: userId });
    if (!job) {
      res.status(400).json({
        success: false,
        msg: `job wih the ${journalId} not found`,
      });
    }
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const createJournals = async (req, res) => {
  const { company, position } = req.body;
  req.body.createdby = req.user.userId;

  console.log(req.user);
  console.log(req.body);
  if (!company || !position) {
    res.status(400).json({
      success: false,
      data: "Pls provide necessary information",
    });
  }
  try {
    const job = await Job.create(req.body);
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const updateJournals = async (req, res) => {
  const {
    params: { journalId },
    user: { userId },
  } = req

  try {
    const job = await Job.findOneAndUpdate({ createdBy: userId,  _id: journalId }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const deleteJournals = async (req, res) => {
    const {
        params: { journalId },
        user: { userId },
      } = req
  try {
    const job = await Job.findOneAndDelete({ createdBy: userId,  _id: journalId });
    res.status(200).json({
      success: true,
      msg: "Deleted",
      job,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

module.exports = {
  getJournals,
  getJournal,
  createJournals,
  updateJournals,
  deleteJournals,
};