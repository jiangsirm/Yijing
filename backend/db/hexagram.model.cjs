const model = require('mongoose').model;

const hexagramSchema = require('./hexagram.schema.cjs');

const HexagramModel = model('Hexagram', hexagramSchema);

function getAllHexagram() {
    return HexagramModel.find().exec();
}

function getHexagramByNumeral(numericalKey) {
    return HexagramModel.find({numericalKey: numericalKey}).exec();
}

function getHexagramByChar(unicodeChar) {
    return HexagramModel.find({unicodeChar: unicodeChar}).exec();
}

function getHexagramByIndex(index) {
    return HexagramModel.find({YijingIndex: index}).exec();
}

module.exports = {
    getAllHexagram,
    getHexagramByChar,
    getHexagramByNumeral,
    getHexagramByIndex
}