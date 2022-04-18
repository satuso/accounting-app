const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const dotenv = require('dotenv')
dotenv.config()

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      businessId: body.businessId,
      vatId: body.vatId,
      name: body.name,
      email: body.email,
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
      iban: body.iban,
      bic: body.bic,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    console.log(error)
  } 
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({}).populate('entries', { id: 1, date: 1, description: 1, price: 1, unit: 1, amount: 1, totalPrice: 1, type: 1, vatPercent: 1, vatAmount: 1, includeVat: 1,  priceWithVat: 1, priceWithoutVat: 1, sum: 1})
    response.json(users.map(u => u))
  } catch (error){
    console.log(error)
  }
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
      .find({}).populate('entries', { id: 1, date: 1, description: 1, price: 1, unit: 1, amount: 1, totalPrice: 1, type: 1, vatPercent: 1, vatAmount: 1, includeVat: 1, priceWithVat: 1, priceWithoutVat: 1, sum: 1 })
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  } catch (error){
    console.log(error)
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end() 
  } catch (error) {
    console.log(error)
  }
})

usersRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {
      businessId: body.businessId,
      vatId: body.vatId,
      name: body.name,
      email: body.email,
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
      iban: body.iban,
      bic: body.bic,
      passwordHash
    }
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })
    response.send(updatedUser)
  } catch (error){
    console.log(error)
  }
})

module.exports = usersRouter