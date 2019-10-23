import React, { useState, useEffect } from 'react'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import { UniversitySelect, UniversityDetails } from 'components'
import { getUniversities, getUniversity } from 'apis'
import { swap, isEmpty } from 'utils'

export const UniContext = React.createContext()

const App = () => {
  const [value, setValue] = useState('')
  const [hash, setHash] = useState([])
  const [defaults, setDefaults] = useState([])
  const [options, setOptions] = useState([])
  const [university, setUniversity] = useState({})

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data: universities } = await getUniversities()
      const universityNames = universities.map(ele => ele.name)

      setHash(
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
    if (value && !isEmpty(hash)) {
      const fetchUniversity = async iped => {
        const { data: university } = await getUniversity(iped)
        //* Swap Common App and Coalition App
        //? Is this mutating state?
        university.applications = swap(
          university.applications,
          'Common',
          'Coalition'
        )

        //* University has_own_application => push into applications array
        //? Is this mutating state?
        if (university.has_own_application) {
          university.applications.push('University Application')
        }

        setUniversity(university)
      }
      //TODO: Consider optimizing
      //# O(N) to O(1) ... optimization success
      const iped = hash[value]
      try {
        fetchUniversity(iped)
      } catch (err) {
        console.error(err)
      }
    }
  }, [value, hash])

  return (
    <UniContext.Provider value={{ setUniversity }}>
      <Grommet full theme={grommet}>
        <UniversitySelect
          label='Select a university'
          value={value}
          options={options}
          defaults={defaults}
          setValue={setValue}
          setOptions={setOptions}
        />
        {!isEmpty(university) && (
          <UniversityDetails
            label='Essay Requirements'
            university={university}
          />
        )}
      </Grommet>
    </UniContext.Provider>
  )
}
export default App
