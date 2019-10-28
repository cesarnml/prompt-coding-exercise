import React, { useState, useEffect } from 'react'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import { UniversitySelect, UniversityDetails } from 'components'
import { getUniversities, getUniversity } from 'apis'
import { swap, isEmpty } from 'utils'

export const UniContext = React.createContext()

const App = () => {
  const [iped, setIped] = useState('')
  const [ops, setOps] = useState([])
  const [university, setUniversity] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data: universities } = await getUniversities()
      const OPTIONS = universities.map(uni => ({
        val: uni.iped,
        lab: uni.name,
      }))
      setOps(OPTIONS)
    }

    fetchUniversities()
  }, [])

  useEffect(() => {
    if (iped) {
      const fetchUniversity = async iped => {
        setLoading(true)
        const { data: university } = await getUniversity(iped)

        //* Swap Common App and Coalition App Order
        university.applications = swap(
          university.applications,
          'Common',
          'Coalition'
        )

        //* university.has_own_application === true => push into applications array
        if (university.has_own_application) {
          university.applications.push('University Application')
        }

        setUniversity(university)
        setLoading(false)
      }

      fetchUniversity(iped)
    }
  }, [iped])

  return (
    <Grommet full theme={grommet}>
      <UniversitySelect
        label='Select a university'
        ops={ops}
        setIped={setIped}
      />
      <UniContext.Provider value={{ setUniversity }}>
        {isLoading ? (
          <h1>Loading ...</h1>
        ) : isEmpty(university) ? (
          <h1>Waiting on choice ...</h1>
        ) : (
          <UniversityDetails
            label='Essay Requirements'
            university={university}
          />
        )}
      </UniContext.Provider>
    </Grommet>
  )
}
export default App
