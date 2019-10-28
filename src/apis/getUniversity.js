import axios from 'axios'

export const getUniversity = async iped => {
  const config = {
    headers: {
      Authorization: `Token ${process.env.REACT_APP_PROMPT_TOKEN}`,
    },
  }

  try {
    return axios.get(
      `${process.env.REACT_APP_PROMPT_URL}/api/data/university/${iped}/`,
      config
    )
  } catch (error) {
    console.error(error)
  }
}
