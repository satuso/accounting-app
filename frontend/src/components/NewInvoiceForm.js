import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Invoice from "./Invoice"

const NewInvoiceForm = ({ user }) => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [businessId, setBusinessId] = useState("")
  const [vatId, setVatId] = useState("")
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [iban, setIban] = useState("")
  const [bic, setBic] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [vatPercent, setVatPercent] = useState(24)
  const [vatAmount, setVatAmount] = useState(0)
  const [includeVat, setIncludeVat] = useState("Ei")
  const [sum, setSum] = useState(0)
  const [priceWithVat, setPriceWithVat] = useState(0)
  const [priceWithoutVat, setPriceWithoutVat] = useState(0)
  const [interest, setInterest] = useState(8)
  const [refNum, setRefNum] = useState("")
  const [dueDate, setDueDate] = useState("")

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
  }, [date, price, amount, totalPrice, vatAmount, includeVat, vatPercent, priceWithVat, priceWithoutVat, sum, interest, refNum, dueDate])

  const calculate = (e) => {
    e.preventDefault()
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

  if (!user) return null

  return (
    <>
      {!show ? <main className="form">
        <Card>
          <Card.Body>
            <Card.Title>Luo lasku</Card.Title>
            <Form onSubmit={calculate}>
              <Form.Group className="mb-2">
                <Form.Text>Laskutettavan yrityksen tiedot:</Form.Text>
                <br/>
                <Form.Label>Yrityksen nimi</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Yrityksen nimi"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Y-tunnus</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Y-tunnus"
                  value={businessId}
                  onChange={({ target }) => setBusinessId(target.value)}
                  minLength={9}
                  maxLength={9}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>ALV-numero</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="ALV-numero"
                  value={vatId}
                  minLength={10}
                  maxLength={10}
                  onChange={({ target }) => setVatId(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Katusoite</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Katuosoite"
                  value={address}
                  onChange={({ target }) => setAddress(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Postinumero</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Postinumero"
                  value={postalCode}
                  onChange={({ target }) => setPostalCode(target.value)}
                  minLength={5}
                  maxLength={5}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Kaupunki</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Kaupunki"
                  value={city}
                  onChange={({ target }) => setCity(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Yrityksen IBAN-tilinumero</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Yrityksen IBAN-tilinumero"
                  value={iban}
                  onChange={({ target }) => setIban(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Pankin BIC-tunnus</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Pankin BIC-tunnus"
                  value={bic}
                  onChange={({ target }) => setBic(target.value)}  
                />
              </Form.Group>
              <br/>
              <Form.Group className="mb-2">
                <Form.Label>Laskun päiväys</Form.Label>
                <Form.Control 
                  type="date"
                  value={date}
                  onChange={({target}) => setDate(target.value)}
                  max={today}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Laskun eräpäivä</Form.Label>
                <Form.Control 
                  type="date"
                  value={dueDate}
                  onChange={({target}) => setDueDate(target.value)}
                  min={today}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Viivästyskorko</Form.Label>
                <Form.Control
                  as="select"
                  variant="light"
                  value={interest}
                  onChange={({target}) => setInterest(target.value)}
                >
                  <option value={8}>Ei</option>
                  <option value={7}>Kyllä</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Viitenumero</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Viitenumero"
                  value={refNum}
                  onChange={({ target }) => setRefNum(target.value)}  
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Tapahtuman selite</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tapahtuman selite"
                  value={description}
                  onChange={({target}) => setDescription(target.value)}
                  minLength={2} 
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Yksikköhinta</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={({target}) => setPrice(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Määrä</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={({target}) => setAmount(target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Hintaan sisältyy ALV</Form.Label>
                <Form.Control
                  as="select"
                  variant="light"
                  value={includeVat}
                  onChange={({target}) => setIncludeVat(target.value)}
                >
                  <option value="Ei">Ei</option>
                  <option value="Kyllä">Kyllä</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>ALV %</Form.Label>
                <Form.Control
                  as="select" 
                  variant="light"
                  title="ALV-kanta"
                  value={vatPercent}
                  onChange={({target}) => {
                    setVatPercent(target.value)
                    setVatAmount(Number(price) * parseFloat(Number(vatPercent)) / 100)
                  }}
                >
                  <option value={24}>24%</option>
                  <option value={14}>14%</option>
                  <option value={10}>10%</option>
                  <option value={0}>0%</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="success">Luo Lasku</Button>
            </Form>
          </Card.Body>
        </Card>
      </main>
        :
        <Invoice
          user={user}
          setShow={setShow}
          name={name}
          vatId={vatId}
          businessId={businessId}
          address={address}
          postalCode={postalCode}
          city={city}
          iban={iban}
          bic={bic}
          date={date}
          description={description}
          vatPercent={vatPercent}
          vatAmount={vatAmount}
          price={price}
          totalPrice={totalPrice}
          amount={amount}
          priceWithVat={priceWithVat}
          priceWithoutVat={priceWithoutVat}
          sum={sum}
          includeVat={includeVat}
          interest={interest}
          refNum={refNum}
          dueDate={dueDate}
        />}
    </>
  )
}

export default NewInvoiceForm