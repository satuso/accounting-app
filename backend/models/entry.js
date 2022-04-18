const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  date: String,
  description: String,
  price: Number,
  unit: String,
  amount: Number,
  totalPrice: Number,
  type: String,
  vatPercent: Number,
  vatAmount: Number,
  includeVat: String,
  priceWithVat: Number,
  priceWithoutVat: Number,
  sum: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry