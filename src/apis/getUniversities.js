import axios from 'axios'

export const getUniversities = async () => {
  return await axios.get(`${process.env.REACT_APP_SERVER_URL}/universities`)
}
