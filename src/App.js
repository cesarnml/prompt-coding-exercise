import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import UniversitySelect from './components/UniversitySelect'
import UniversityDetails from './components/UniversityDetails'

const swapAppTypes = (arr, swap1, swap2) => {
  // if both elements present => swap elements and return swapped array
  if (arr.includes(`${swap1} App`) && arr.includes(`${swap2} App`)) {
    const index1 = arr.indexOf(`${swap1} App`)
    const index2 = arr.indexOf(`${swap2} App`)
    const temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }
  return arr
}

const showUniDetails = uni => {
  return !!uni.name
}

const App = () => {
  const [defaults, setDefaults] = useState([])
  const [options, setOptions] = useState([])
  const [objects, setObjects] = useState([])
  const [value, setValue] = useState('')

  const [university, setUniversity] = useState({})

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data: universities } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/universities`
      )
      const universityNames = universities.map(ele => ele.name)
      setObjects(
        universities.map(ele => ({ value: ele.iped, label: ele.name }))
      )
      setDefaults(universityNames)
      setOptions(universityNames)
    }

    try {
      fetchUniversities()
    } catch (err) {
      //TODO: generalize error catcher
      console.error(err)
    }
  }, [])

  useEffect(() => {
    if (value && objects.length) {
      const fetchUniversity = async iped => {
        const config = {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_PROMPT_TOKEN}`,
          },
        }
        const { data: university } = await axios.get(
          `${process.env.REACT_APP_PROMPT_URL}/api/data/university/${iped}/`,
          config
        )
        //* Swap Common App and Coalition App
        university.applications = swapAppTypes(
          university.applications,
          'Common',
          'Coalition'
        )

        //* University has_own_application => push into applications array
        if (university.has_own_application) {
          university.applications.push('University Application')
        }

        setUniversity(university)
      }
      //TODO: Consider optimizing
      const iped = objects.find(obj => obj.label === value).value
      fetchUniversity(iped)
    }
  }, [value, objects])

  return (
    <Grommet full theme={grommet}>
      <UniversitySelect
        label='Select a university'
        value={value}
        options={options}
        defaults={defaults}
        setValue={setValue}
        setOptions={setOptions}
      />
      {showUniDetails(university) && (
        <UniversityDetails label='Essay Requirements' university={university} />
      )}
    </Grommet>
  )
}
export default App
