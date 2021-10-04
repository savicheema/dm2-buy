const express = require('express');
const router = express.Router();

router.get('/', getIndex)


module.exports = router


function getIndex(req, res, next){
    console.log("index")
    res.send("dm2buy")
}

