import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom"
import EntryPreview from "./EntryPreview"
import { useDispatch } from "react-redux"
import { createEntry } from "../reducers/entryReducer"

const NewEntryForm = ({ user }) => {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [unit, setUnit] = useState("Kappale")
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("Tulo")
  const [vatPercent, setVatPercent] = useState(24)
  const [includeVat, setIncludeVat] = useState("Ei")
  const [totalPrice, setTotalPrice] = useState(0)
  const [vatAmount, setVatAmount] = useState(0)
  const [priceWithVat, setPriceWithVat] = useState(0)
  const [priceWithoutVat, setPriceWithoutVat] = useState(0)
  const [sum, setSum] = useState(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (totalPrice > 0) {
      setVatAmount(totalPrice * parseFloat(vatPercent) / 100)
    }
    if (vatAmount > 0){
      if (includeVat === "Ei"){
        setPriceWithVat(totalPrice + vatAmount)
        setPriceWithoutVat(totalPrice)
        setSum(totalPrice + vatAmount)
        setShow(true)
      }
      if (includeVat === "Kyllä"){
        setPriceWithVat(totalPrice)
        setPriceWithoutVat(totalPrice - vatAmount)
        setSum(totalPrice)
        setShow(true)
      }
    }
  }, [date, description, price, type, unit, amount, totalPrice, vatAmount, includeVat, vatPercent, priceWithVat, priceWithoutVat, sum])

  const calculate = () => {
    setTotalPrice(price * amount)
    if (includeVat === "Ei"){
      setPriceWithVat(totalPrice +vatAmount)
      setPriceWithoutVat(totalPrice)
      setSum(totalPrice + vatAmount)
      setShow(true)
    }
    if (includeVat === "Kyllä"){
      setPriceWithVat(totalPrice)
      setPriceWithoutVat(totalPrice - vatAmount)
      setSum(totalPrice)
      setShow(true)
    }
  }

  const newDate = new Date()
  const todayDate = newDate.toISOString().split("T")
  const today = todayDate[0]

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const obj = {
        date, description, price, totalPrice, unit, amount, type, vatPercent, vatAmount, includeVat, priceWithVat, priceWithoutVat, sum
      }
      /*await entryService.create({
        date, description, price, totalPrice, unit, amount, type, vatPercent, vatAmount, includeVat, priceWithVat, priceWithoutVat, sum
      })*/
      dispatch(createEntry(obj))
      setDate("")
      setDescription("")
      setType("")
      setVatPercent(0)
      setIncludeVat(true)

      navigate("/entries")
      //setMessage("Tietueen lisääminen onnistui", "success")
    } catch (exception) {
      console.log(exception)
      //setMessage("Tietueen lisääminen epäonnistui", "danger")
    }
  }

  if (!user) return null

  return (
    <main className="form">
      {!show ? 
        <Card>
          <Card.Body>
            <Card.Title>Lisää uusi tietue kirjanpitoon</Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Päivämäärä *</Form.Label>
                <Form.Control 
                  type="date"
                  value={date}
                  onChange={({target}) => setDate(target.value)}
                  max={today}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tapahtuman selite *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tapahtuman selite"
                  value={description}
                  onChange={({target}) => setDescription(target.value)}
                  minLength={2}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tapahtuman tyyppi *</Form.Label>
                <Form.Select  
                  variant="light"
                  onChange={({target}) => setType(target.value)}
                  required
                >
                  <option value="Tulo">Tulo</option>
                  <option value="Kulu">Kulu</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Yksikköhinta *</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={({target}) => setPrice(target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Yksikkö *</Form.Label>
                <Form.Select  
                  variant="light"
                  onChange={({target}) => setUnit(target.value)}
                  required
                >
                  <option defaultValue="Kappale">Kappale</option>
                  <option value="Tunti">Tunti</option>
                  <option value="Kuukausi">Kuukausi</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Määrä *</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={({target}) => setAmount(target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hintaan sisältyy ALV</Form.Label>
                <Form.Control
                  as="select"
                  variant="light"
                  value={includeVat}
                  onChange={({target}) => setIncludeVat(target.value)}
                  required
                >
                  <option value="Ei">Ei</option>
                  <option value="Kyllä">Kyllä</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ALV % *</Form.Label>
                <Form.Control
                  as="select" 
                  variant="light"
                  title="ALV-kanta"
                  value={vatPercent}
                  onChange={({target}) => {
                    setVatPercent(target.value)
                    
                  }}
                  required
                >
                  <option value={24}>24%</option>
                  <option value={14}>14%</option>
                  <option value={10}>10%</option>
                  <option value={0}>0%</option>
                </Form.Control>
              </Form.Group>
              <br/>
              <Button onClick={calculate} variant="success">Esikatsele</Button>
            </Form>
          </Card.Body>
        </Card>
        :
        <EntryPreview
          show={show}
          setShow={setShow}
          date={date}
          description={description}
          type={type}
          vatPercent={vatPercent}
          vatAmount={vatAmount}
          price={price}
          unit={unit}
          amount={amount}
          priceWithVat={priceWithVat}
          priceWithoutVat={priceWithoutVat}
          sum={sum}
          includeVat={includeVat}
          submitForm={submitForm}
        />
      }
    </main>
  )
}

export default NewEntryForm