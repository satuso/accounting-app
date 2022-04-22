import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"
import loginService from "../services/login"
import entryService from "../services/entries"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({
        email, password
      })
      window.localStorage.setItem(
        "loggedInUser", JSON.stringify(loggedInUser)
      )
      entryService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setEmail("")
      setPassword("")
      navigate("/profile")
      dispatch(setNotification("Kirjautuminen onnistui", "success"))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Kirjautuminen epäonnistui", "danger"))
    }
  }

  return (
    <main className="form">
      <Card>
        <Card.Body>
          <Card.Title>Kirjaudu sisään</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Sähköposti</Form.Label>
              <Form.Control
                type="email"
                placeholder="Sähköposti"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Salasana</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Salasana"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  )
}
export default Login