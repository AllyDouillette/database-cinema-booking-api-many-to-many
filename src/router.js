const express = require('express')
const router = express.Router()

router.get('/screen/:id', getScreenById)
router.post('/ticket', createTicket)

module.exports = { router }