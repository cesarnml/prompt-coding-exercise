import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import UniversitySelect from './components/UniversitySelect'
import UniversityDetails from './components/UniversityDetails'
import { getUniversities } from './apis'
import { swap } from './utility'

const showUniDetails = uni => {
  return !!uni.name
}

const App = () => {
  const [value, setValue] = useState('')
  const [defaults, setDefaults] = useState([])
  const [options, setOptions] = useState([])
  const [objects, setObjects] = useState([])
  const [university, setUniversity] = useState({})

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data: universities } = await getUniversities()
      const universityNames = universities.map(ele => ele.name)
      setObjects(
        universities.reduce((acc, cur) => {
          return { ...acc, ...{ [cur.name]: cur.iped } }
        }, {})
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
    if (value && Object.keys(objects).length) {
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
        university.applications = swap(
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
      //# O(N) to O(1) ... optimization success
      const iped = objects[value]
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
