import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import UniversitySelect from './components/UniversitySelect'
import UniversityDetails from './components/UniversityDetails'

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
        const res = await axios.get(
          `${process.env.REACT_APP_PROMPT_URL}/api/data/university/${iped}/`,
          config
        )
        const university = res.data
        //* if Common App & Coalition App present
        //* Swap-Order
        if (
          university.applications.includes('Coalition App') &&
          university.applications.includes('Common App')
        ) {
          const indexCoalition = university.applications.indexOf(
            'Coalition App'
          )
          const indexCommon = university.applications.indexOf('Common App')
          const temp = university.applications[indexCoalition]
          university.applications[indexCoalition] =
            university.applications[indexCommon]
          university.applications[indexCommon] = temp
        }
        //* University has_own_application => push into applications array
        if (university.has_own_application) {
          university.applications.push('University Application')
        }

        setUniversity(university)
      }
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
      {!!university.name && (
        <UniversityDetails label='Essay Requirements' university={university} />
      )}
    </Grommet>
  )
}
export default App
