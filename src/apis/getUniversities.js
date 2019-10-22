import axios from 'axios'

export const getUniversities = async () => {
  return axios.get(`${process.env.REACT_APP_SERVER_URL}/universities`)
}
