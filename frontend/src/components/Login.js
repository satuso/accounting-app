import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"
import loginService from "../services/login"
import entryService from "../services/entries"
import { useStore } from "../store"

const Login = () => {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 

  const { setUser, setMessage } = useStore()

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email, password,
      })
      window.localStorage.setItem(
        "loggedInUser", JSON.stringify(user)
      ) 
      entryService.setToken(user.token)
      setUser(user)
      setEmail("")
      setPassword("")
      navigate("/profile")
      setMessage("Kirjautuminen onnistui", "success")
    } catch (exception) {
      setMessage("Kirjautuminen epäonnistui", "danger")
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