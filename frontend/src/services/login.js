import axios from "axios"
const baseUrl = "https://satuso-accounting-backend.herokuapp.com/api/login"

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }