import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"
import usersService from "../services/users"
import loginService from "../services/login"
import entryService from "../services/entries"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const RegisterForm = ({ setUser, users }) => {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 
  const [passwordConfirm, setPasswordConfirm] = useState("") 

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      if (users.length > 0){
        const emails = users.map(user => user.email.toLowerCase())
        if (emails.includes(email.toLowerCase())){
          return dispatch(setNotification("Sähköposti on jo käytössä", "danger"))
        }
      }
      if (password === passwordConfirm){
        await usersService.create({
          email: email,
          password: password,
          name: "",
          businessId: "",
          vatId: "",
          address: "",
          postalCode: "",
          city: "",
          iban: "",
          bic: ""
        })
        const user = await loginService.login({
          email, password
        })
        window.localStorage.setItem(
          "loggedInUser", JSON.stringify(user)
        )
        entryService.setToken(user.token)
        setUser(user)
        setEmail("")
        setPassword("")
        dispatch(setNotification("Tunnus luotu! Olet nyt kirjautuneena sisään", "success"))
        navigate("/profile")
      } else {
        dispatch(setNotification("Salasana ei täsmää", "danger"))
      }
    } catch (exception) {
      dispatch(setNotification("Rekisteröityminen epäonnistui", "danger"))
    }
  }

  return (
    <main className="form">
      <Card>
        <Card.Body>
          <Card.Title>Rekisteröidy</Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-2">
              <Form.Label>Sähköposti *</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Sähköposti"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
              <Form.Text className="text-muted">Emme jaa sähköpostiosoitettasi.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Salasana *</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Salasana"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Vahvista salasana *</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Salasana"
                value={passwordConfirm}
                onChange={({ target }) => setPasswordConfirm(target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">Rekisteröidy</Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  )
}
export default RegisterForm