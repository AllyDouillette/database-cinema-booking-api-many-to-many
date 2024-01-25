const express = require('express')
const router = express.Router()
const { getScreenById, createTicket } = require('./controller')

router.get('/screen/:id', getScreenById)
router.post('/ticket', createTicket)

module.exports = { router }