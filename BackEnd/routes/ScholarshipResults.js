const express = require("express");
const router = express.Router();
const {ScholarshipResults} = require("../models");


router.post("/", async (req, res) => {
  try {
    const { year, schoolID, results } = req.body;

    // Loop through the results array and create or update records in the database
    for (const result of results) {
      const {
        Count0_5,
        Count6_24,
        Count25_49,
        Count50_69,
        Count70_99,
        Count100_124,
        Count125_150,
        Count151_175,
        Count175_200,
        MaximumMark,
        MinimumMark,
        Absent,
        sat,
        pass,
      } = result;

      await ScholarshipResults.create({
        Count0_5: Count0_5,
        Count6_24: Count6_24,
        Count25_49: Count25_49,
        Count50_69: Count50_69,
        Count70_99: Count70_99,
        Count100_124: Count100_124,
        Count125_150: Count125_150,
        Count151_175: Count151_175,
        Count175_200: Count175_200,
        MaximumMark: MaximumMark,
        MinimumMark: MinimumMark,
        Absent: Absent,
        NumOfSat: sat,
        NumOfPass: pass,
        year: year,
        school_ID: schoolID,
      });
    }

    res.json({ message: "Data uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


  


module.exports = router;

