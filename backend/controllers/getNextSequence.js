const Counter = require("../models/counter");

async function getNextSequence(ticketType) {
  try {
    const counter = await Counter.findByIdAndUpdate(
      ticketType,
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    return counter.sequence_value;
  } catch (error) {
    console.error("Error getting the next sequence:", error);
    throw error; // Lanzar error para manejarlo en la función llamante
  }
}

module.exports = getNextSequence;
