const express = require('express');
const router = express.Router();


router.get('/indus', (req,res) => {
  // res.send(crouse)
  const name = req.query
  console.log("hamza")
  res.send("hamza working fine")
});


  module.exports = router;