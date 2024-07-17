const express = require('express');
const router = express.Router();
const ChineseCharModel = require('./db/chineseChar.model.cjs');

// api/account/charcode
router.get('/:charCode', async function(req, res) {
    try {
        const charUnicode = parseInt(req.params.charCode);
        // console.log(charUnicode)
        // console.log(String.fromCharCode(charUnicode))
        const getAccountResponse = await ChineseCharModel.getCharacter(String.fromCharCode(charUnicode));
        return res.status(200).send({strokes: getAccountResponse[0].strokes});
    } catch (error) {
        res.status(400);
        return res.send(error.message);
    }
})

module.exports = router