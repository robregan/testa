const express = require('express')
const FoodDiary = require('../models/diaryModel')
const mongoose = require('mongoose')


// Get all Food Diary Logs 
const getDiarys = async(req, res) => {
    const diary = await (FoodDiary.find({}).sort({createdAt: -1}))
    res.status(200).json(diary)
}

// Get single Food Diary Log 
const getDiary = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Diary Found'})
    }
    
    const diary = await FoodDiary.findById(id)

    if(!diary) {
        return res.status(404).json({error: 'No Diary Found'})
    }

    res.status(200).json(diary)
}

// Create new Food Log, Post Request // 
const createDiary = async (req, res) => {
    const {item, calories, serving} = req.body

    let emptyFields = []

    if(!item) {
        emptyFields.push('item')
    }
    if(!calories) {
        emptyFields.push('calories')
    }
    if(!serving) {
        emptyFields.push('serving')
    }
    if(emptyFields > 0) {
        return res.status(400).json({error: "Please Fill In All Of The Fields"}, emptyFields)
    }

    // Add Food log to DB // 
    try {
        const diary = await FoodDiary.create({item, calories, serving})
        res.status(200).json(diary)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// Delete request // 

const deleteDiary = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No Specific Diary Found"})
    }

    const diary = await FoodDiary.findOneAndDelete({_id: id})

    if(!diary) {
        return res.status(400).json({error: "No Specific Diary Found"})
    }

    res.status(200).json(diary)
}


// Updating single Food Log // 
const updateDiary = async (req, res) => {   
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No Diary Found to Update'})
    }

    const diary = await FoodDiary.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!diary){
        return res.status(400).json({error: 'No Diary Found to Update'})
    }

    res.status(200).json(diary)
}



module.exports = {
    getDiarys, 
    getDiary,
    createDiary,
    deleteDiary,
    updateDiary
}


