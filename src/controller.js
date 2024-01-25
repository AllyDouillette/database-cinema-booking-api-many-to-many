const prisma = require("./utils/prisma");

const getScreenById = async (req, res) => {
  const id = Number(req.params.id);
  const screen = await prisma.screen.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      screenings: {
        include: {
          movie: true,
          tickets: {
            include: {
              seats: true,
            },
          },
        },
      },
    },
  });

  res.json({ screen });
}

const createTicket = async (req, res) => {
  const { customerId, screeningId } = req.body;
  const seats = req.body.seatIds.map((seatId) => ({ seatId }));

  const ticket = await prisma.ticket.create({
    data: {
      customerId,
      screeningId,
      seats: {
        create: seats,
      },
    },
    include: {
      screening: {
        include: {
          movie: true,
        },
      },
      seats: true,
    },
  });

  res.status(201).json({ ticket });
}

module.exports = {
  getScreenById,
  createTicket
};