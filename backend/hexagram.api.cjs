const express = require('express');
const router = express.Router();
const HexagramModel = require('./db/hexagram.model.cjs');

function GETHEXAGRAM(number) {
    switch(number) {
        case 1:
            return "111"
        case 2:
            return "011"
        case 3:
            return "101"
        case 4:
            return "001"
        case 5:
            return "110"
        case 6:
            return "010"
        case 7:
            return "100"
        case 0:
            return "000"
    }
}
// api/hexagram/hexagrams?
router.get('/hexagrams', async function(req, res) {
    try {
        const upperNumber = parseInt(req.query.upper);
        const lowerNumber = parseInt(req.query.lower);
        const shichen = parseInt(req.query.shichen);
        // console.log(charUnicode)
        // console.log(String.fromCharCode(charUnicode))
        const firstHexagramString = GETHEXAGRAM(upperNumber % 8) + GETHEXAGRAM(lowerNumber % 8)
        const firstHexagram = await HexagramModel.getHexagramByNumeral(firstHexagramString)

        const yaoChange = (upperNumber + lowerNumber + shichen) % 6
        const secondHexagramString = firstHexagramString.substring(0, yaoChange) + (firstHexagramString[yaoChange] === "1" ? "0" : "1") + firstHexagramString.substring(yaoChange + 1)
        const secondHexagram = await HexagramModel.getHexagramByNumeral(secondHexagramString)

        return res.status(200).send([firstHexagram[0],secondHexagram[0]]);
    } catch (error) {
        res.status(400);
        return res.send(error.message);
    }
})

module.exports = router