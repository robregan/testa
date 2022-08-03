const express = require('express')

const {
    getDiarys,
    getDiary,
    createDiary,
    updateDiary,
    deleteDiary,
} = require('../controllers/diaryController')

const router = express.Router()

router.get('/', getDiarys)

router.get('/:id', getDiary)

router.post('/', createDiary)

router.put('/:id', updateDiary)

router.delete('/:id', deleteDiary)

module.exports = router 