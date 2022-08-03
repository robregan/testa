const mongoose = require('mongoose')

const Schema = mongoose.Schema

const diarySchema = new Schema({
    item: {
        type: String, 
        required: true
    },
    calories: {
        type: Number, 
        required: true
    },
    serving: {
        type: Number, 
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('FoodDiary', diarySchema)