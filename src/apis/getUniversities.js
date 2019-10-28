import axios from 'axios'

export const getUniversities = async () => {
  try {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/universities`)
  } catch (error) {
    console.error(error)
  }
}
