import React from "react"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"

const EntryPreview = ({ 
  show,
  setShow,
  date,
  description,
  type,
  vatPercent,
  vatAmount,
  price,
  unit,
  amount,
  priceWithVat,
  priceWithoutVat,
  sum,
  includeVat,
  submitForm
}) => {
  return (
    <Alert show={show} variant="secondary">
      <Alert.Heading>Esikatselu</Alert.Heading>
      <hr/>
      <p>Päivämäärä: {date}</p>
      <p>Kuvaus: {description}</p>
      <p>Tyyppi: {type}</p>
      <p>ALV %: {vatPercent} %</p>
      <p>ALV:n määrä: {vatAmount} €</p>
      <p>Yksikköhinta: {price} €</p>
      <p>Yksikkö: {unit}</p>
      <p>Määrä: {amount}</p>
      <p>Verollinen hinta: {priceWithVat} €</p>
      <p>Veroton hinta: {priceWithoutVat} €</p>
      <p>Yhteensä: {sum} €</p>
      <p>Hintaan sisältyy ALV: {includeVat}</p>
      <Button onClick={() => setShow(false)} variant="secondary">Edellinen</Button> <Button onClick={submitForm} variant="success">Lähetä</Button>
    </Alert>
  )
}
export default EntryPreview