const jwt = require('jsonwebtoken')
const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

entriesRouter.get('/', async (request, response) => {
  try {
  const entries = await Entry
    .find({}).populate('user', { user: 1, businessId: 1, vatId: 1, name: 1, address: 1, postalCode: 1, city: 1, id: 1, email: 1 })
  response.json(entries.map(entry => entry))
  } catch(error){
    console.log(error)
  }
})

entriesRouter.get('/:id', async (request, response) => {
  try {
    const entry = await Entry.findById(request.params.id)
    .find({}).populate('user', { user: 1, businessId: 1, vatId: 1, name: 1, address: 1, postalCode: 1, city: 1, id: 1, email: 1 })

    response.json(entry.map(entry => entry))
  } catch(error){
    console.log(error)
  }
})

entriesRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const entry = new Entry({
      date: body.date,
      description: body.description,
      price: body.price,
      unit: body.unit,
      amount: body.amount,
      type: body.type,
      totalPrice: body.totalPrice,
      vatPercent: body.vatPercent,
      vatAmount: body.vatAmount,
      includeVat: body.includeVat,
      priceWithVat: body.priceWithVat,
      priceWithoutVat: body.priceWithoutVat,
      sum: body.sum,
      user: user._id
    })

    const savedEntry = await entry.save()
    user.entries = user.entries.concat(savedEntry._id)
    await user.save()

    const populatedEntry = await savedEntry
    .populate('user', { user: 1, businessId: 1, name: 1, address: 1, postalCode: 1, city: 1,  id: 1, email: 1 })
    response.status(201).json(populatedEntry)
  } catch(error){
    console.log(error)
  }
})


entriesRouter.delete('/:id', async (request, response) => {
  try {
    await Entry.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(error){
    console.log(error)
  }
})

entriesRouter.put('/:id', async (request, response) => {
  try {
    const entry = request.body
    const updatedEntry = await Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    response.json(updatedEntry)
  } catch(error){
    console.log(error)
  }
})

module.exports = entriesRouter