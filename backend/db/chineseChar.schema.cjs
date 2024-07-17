const Schema = require('mongoose').Schema;
module.exports = new Schema({
    character: {
        type: String,
        required: true,
        unique: true
    },
    strokes: {
        type:Number,
        require: true
    }
}, {collection: 'ChineseCharDict'}) 