import React from "react"
import Table from "react-bootstrap/Table"
import Entry from "./Entry"
import { useDispatch } from "react-redux"
import { deleteEntry } from "../reducers/entryReducer"
import { setNotification } from "../reducers/notificationReducer"

const Entries = ({ user, entries }) => {
  const dispatch = useDispatch()

  const entriesByUser = entries?.filter(entry => entry.user.id === user?.id)
  const incomeEntries = entriesByUser?.filter(entry => entry.type === "Tulo")
  const expenseEntries = entriesByUser?.filter(entry => entry.type === "Kulu")

  //Calculate Vat:
  //incomevat24%
  const vat24Entries = incomeEntries?.filter(entry => entry.vatPercent === 24)
  const vat24List = vat24Entries?.map(entry => entry.vatAmount)
  const withoutVat24List = vat24Entries?.map(entry => entry.totalPrice)
  const total24 = withoutVat24List?.concat(vat24List)
  //incomevat14%
  const vat14Entries = incomeEntries?.filter(entry => entry.vatPercent === 14)
  const vat14List = vat14Entries?.map(entry => entry.vatAmount)
  const withoutVat14List = vat14Entries?.map(entry => entry.totalPrice)
  const total14 = withoutVat14List?.concat(vat14List)
  //incomevat10%
  const vat10Entries = incomeEntries?.filter(entry => entry.vatPercent === 10)
  const vat10List = vat10Entries?.map(entry => entry.vatAmount)
  const withoutVat10List = vat10Entries?.map(entry => entry.totalPrice)
  const total10 = withoutVat10List?.concat(vat10List)
  //incomevat0%
  const vat0Entries = incomeEntries?.filter(entry => entry.vatPercent === 0)
  const withoutVat0List = vat0Entries?.map(entry => entry.totalPrice)
  //expensesvat24%
  const vat24EntriesE = expenseEntries?.filter(entry => entry.vatPercent === 24)
  const vat24ListE = vat24EntriesE?.map(entry => entry.vatAmount)
  const withoutVat24ListE = vat24EntriesE?.map(entry => entry.totalPrice)
  const total24E = withoutVat24ListE?.concat(vat24ListE)
  //expensesvat14%
  const vat14EntriesE = expenseEntries?.filter(entry => entry.vatPercent === 14)
  const vat14ListE = vat14EntriesE?.map(entry => entry.vatAmount)
  const withoutVat14ListE = vat14EntriesE?.map(entry => entry.totalPrice)
  const total14E = withoutVat14ListE?.concat(vat14ListE)
  //expensesvat10%
  const vat10EntriesE = expenseEntries?.filter(entry => entry.vatPercent === 10)
  const vat10ListE = vat10EntriesE?.map(entry => entry.vatAmount)
  const withoutVat10ListE = vat10EntriesE?.map(entry => entry.totalPrice)
  const total10E = withoutVat10ListE?.concat(vat10ListE)
  //expensesvat0%
  const vat0EntriesE = expenseEntries?.filter(entry => entry.vatPercent === 0)
  const withoutVat0ListE = vat0EntriesE?.map(entry => entry.totalPrice)

  const getSum = (vatList) => {
    return vatList?.reduce(
      (previousValue, currentValue) => previousValue + currentValue, 0)
  }

  const totalWithoutVatSum = getSum(withoutVat24List) + getSum(withoutVat14List) + getSum(withoutVat10List)
  const totalVatSum = getSum(vat24List) + getSum(vat14List) + getSum(vat10List)
  const totalSum = getSum(total24) + getSum(total14) + getSum(total10)

  const totalWithoutVatSumE = getSum(withoutVat24ListE) + getSum(withoutVat14ListE) + getSum(withoutVat10ListE)
  const totalVatSumE = getSum(vat24ListE) + getSum(vat14ListE) + getSum(vat10ListE)
  const totalSumE = getSum(total24E) + getSum(total14E) + getSum(total10E)

  const removeEntry = async (id, entry, user) => {
    if (window.confirm("Haluatko varmasti poistaa tietueen?")){
      try {
        dispatch(deleteEntry(entry.id, entry, user))
        dispatch(setNotification("Tietue poistettu", "success"))
      } catch (exception) {
        dispatch(setNotification("Tietueen poistaminen epäonnistui", "danger"))
      }
    }
  }

  if (!user) return null

  return (
    <main>
      <h2>Kirjanpito</h2>
      <hr/>
      <p>Vuosi 2022</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Päivämäärä</th>
            <th>Tapahtuman selite</th>
            <th>Tyyppi</th>
            <th>Alv %</th>
            <th>Alv €</th>
            <th>Hinta</th>
            <th>Yksikkö</th>
            <th>Määrä</th>
            <th>Sis. ALV</th>
            <th>Veroton hinta</th>
            <th>Verollinen hinta</th>
            <th>Yhteensä</th>
          </tr>
        </thead>
        <tbody>
          {entriesByUser.map((entry, index) => <Entry key={entry.id} index={index} entry={entry} removeEntry={removeEntry} user={user}/>)}
        </tbody>
      </Table>
      <br/>
      <h2>Arvonlisäverolaskelma</h2>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th width="300">🟢 Tulojen arvonlisäverot</th>
            <th width="300">Veroton</th>
            <th width="300">Vero</th>
            <th width="300">Yhteensä</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alv 24%</td>
            <td>{getSum(withoutVat24List)} €</td>
            <td>{getSum(vat24List)} €</td>
            <td>{getSum(total24)} €</td>
          </tr>
          <tr>
            <td>Alv 14%</td>
            <td>{getSum(withoutVat14List)} €</td>
            <td>{getSum(vat14List)} €</td>
            <td>{getSum(total14)} €</td>
          </tr>
          <tr>
            <td>Alv 10%</td>
            <td>{getSum(withoutVat10List)} €</td>
            <td>{getSum(vat10List)} €</td>
            <td>{getSum(total10)} €</td>
          </tr>
          <tr>
            <td>Alv 0%</td>
            <td>{getSum(withoutVat0List)} €</td>
            <td></td>
            <td>{getSum(withoutVat0List)}€</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Yhteensä</th>
            <th>{totalWithoutVatSum} €</th>
            <th>{totalVatSum} €</th>
            <th>{totalSum} €</th>
          </tr>
        </thead>
      </Table>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th width="300">🔴 Kulujen arvonlisäverot</th>
            <th width="300">Veroton</th>
            <th width="300">Vero</th>
            <th width="300">Yhteensä</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alv 24%</td>
            <td>{getSum(withoutVat24ListE)} €</td>
            <td>{getSum(vat24ListE)} €</td>
            <td>{getSum(total24E)} €</td>
          </tr>
          <tr>
            <td>Alv 14%</td>
            <td>{getSum(withoutVat14ListE)} €</td>
            <td>{getSum(vat14ListE)} €</td>
            <td>{getSum(total14E)} €</td>
          </tr>
          <tr>
            <td>Alv 10%</td>
            <td>{getSum(withoutVat10ListE)} €</td>
            <td>{getSum(vat10ListE)} €</td>
            <td>{getSum(total10E)} €</td>
          </tr>
          <tr>
            <td>Alv 0%</td>
            <td>{getSum(withoutVat0ListE)} €</td>
            <td></td>
            <td>{getSum(withoutVat0ListE)}€</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Yhteensä</th>
            <th>{totalWithoutVatSumE} €</th>
            <th>{totalVatSumE} €</th>
            <th>{totalSumE} €</th>
          </tr>
        </thead>
      </Table>
    </main>
  )
}

export default Entries