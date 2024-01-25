const prisma = require('./utils/prisma')

const getScreenByIdDb = async (id) => {
  const screen = await prisma.screen.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      screenings: {
        include: {
          movie: true,
          tickets: {
            include: {
              seats: true
            }
          }
        }
      }
    }
  });

  return res.json({ screen });
}

const createTicketDb = async (req, res) => {
  const { customerId, screeningId } = req.body
  const seats = req.body.seatIds.map((seatId) => { seatId })

  const ticket = await prisma.ticket.create({
    data: {
      customerId,
      screeningId,
      seats: {
        create: seats
      }
    },
    include: {
      screening: {
        include: {
          movie: true
        }
      },
      seats: true
    }
  });

  return res.status(201).json({ ticket });
}

module.exports = { getScreenByIdDb, createTicketDb }