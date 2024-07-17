const model = require('mongoose').model;
const ChineseCharSchema = require('./chineseChar.schema.cjs')
const ChineseCharModel = model('ChineseChar', ChineseCharSchema)

function getCharacter(chineseChar) {
    return ChineseCharModel.find({character: chineseChar}).exec();
}

module.exports = {
    getCharacter
}