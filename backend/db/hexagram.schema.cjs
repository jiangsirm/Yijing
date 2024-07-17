const Schema = require('mongoose').Schema;
module.exports = new Schema({
    numericalKey: {
        type: String,
        required: true,
        unique: true
    },
    unicodeChar: {
        type:String,
        require: true,
        unique: true
    },
    YijingIndex: {
        type:Number,
        require: true,
        unique: true
    }
}, {collection: 'hexagram'}) 