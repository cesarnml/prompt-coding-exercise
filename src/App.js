import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { grommet } from 'grommet/themes'
import { Box, Grommet, Select, Heading, Text } from 'grommet'

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
      <Box
        pad='medium'
        align='start'
        width='xlarge'
        border={{ color: 'red' }}
        margin='small'
      >
        <Heading level='2'>Select a university</Heading>
        <Box width='medium' pad='medium'>
          <Select
            size='medium'
            dropHeight='medium'
            placeholder='MIT'
            searchPlaceholder='Search a university'
            value={value}
            options={options}
            onChange={({ option }) => {
              setValue(option)
            }}
            onClose={() => setOptions(defaults)}
            onSearch={text => {
              //? escapes special characters to avoid console errors on regexp
              const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
              const exp = new RegExp(escapedText, 'i')
              setOptions(defaults.filter(o => exp.test(o)))
            }}
          />
        </Box>
      </Box>
      {university.name && (
        <Box
          align='start'
          pad='medium'
          width='xlarge'
          border={{ color: 'green' }}
          margin='small'
        >
          {university.name && (
            <Heading level='2'>
              Essay Requirements -{' '}
              {university.name === 'University Application'
                ? 'University-Specific Application'
                : university.name}
            </Heading>
          )}
          {university.applications &&
            university.applications.map(appType => (
              <Box
                key={appType}
                margin={{ bottom: 'xlarge' }}
                border={{ color: 'purple' }}
                width='large'
              >
                <Box
                  pad={{ horizontal: 'medium', vertical: 'small' }}
                  border={{
                    side: 'bottom',
                    style: 'dashed',
                    size: 'small',
                    color: 'black',
                  }}
                >
                  <Heading level='3' margin='0'>
                    {appType === 'University Application'
                      ? 'University-Specific Application'
                      : appType}
                  </Heading>
                </Box>
                <Box
                  as='h4'
                  direction='row'
                  justify='between'
                  margin={{ horizontal: 'small' }}
                  border={{ color: 'green' }}
                  pad='medium'
                >
                  <Text>Application Essays</Text>
                  <Text>{`${
                    appType === 'Common App'
                      ? university.applications.length
                      : '0'
                  } ${
                    university.applications.length > 1 ? 'Essays' : 'Essay'
                  }`}</Text>
                </Box>
                <Box
                  as='ul'
                  margin={{ horizontal: 'small' }}
                  pad={{ left: 'medium' }}
                  style={{ border: '1px solid pink' }}
                >
                  {appType === 'Common App'
                    ? university.application_essays.map(essay => (
                        <Text
                          as='li'
                          key={essay.name}
                          style={{ listStyle: 'none' }}
                        >
                          <Text>{essay.name}</Text>
                        </Text>
                      ))
                    : null}
                </Box>
                <Box
                  as='h4'
                  direction='row'
                  justify='between'
                  margin={{ horizontal: 'small' }}
                  border={{ color: 'green' }}
                  pad='medium'
                >
                  <Text>Required Supplements</Text>
                  <Text>{`${
                    university.supplements
                      .filter(supp => supp.applications.includes(appType))
                      .filter(supp => !supp.optional).length
                  } Essays`}</Text>
                </Box>
                <Box
                  as='ul'
                  margin={{ horizontal: 'small' }}
                  pad={{ left: 'medium' }}
                  style={{ border: '1px solid pink' }}
                >
                  {university.supplements
                    .filter(supp => !supp.optional)
                    .filter(supp => supp.applications.includes(appType))
                    .map(essay => (
                      <Box
                        as='li'
                        key={essay.name}
                        style={{ listStyle: 'none' }}
                      >
                        <Text>{essay.name}</Text>
                      </Box>
                    ))}
                </Box>
                <Box
                  as='h4'
                  direction='row'
                  justify='between'
                  margin={{ horizontal: 'small' }}
                  border={{ color: 'green' }}
                  pad='medium'
                >
                  <Text>Optional Supplements</Text>
                  <Text>{`${
                    university.supplements
                      .filter(supp => supp.applications.includes(appType))
                      .filter(supp => supp.optional).length
                  } Essays`}</Text>
                </Box>

                <Box
                  as='ul'
                  margin={{ horizontal: 'small' }}
                  pad={{ left: 'medium' }}
                  style={{ border: '1px solid pink' }}
                >
                  {university.supplements &&
                    university.supplements
                      .filter(supp => supp.optional)
                      .filter(supp => supp.applications.includes(appType))
                      .map(essay => (
                        <Box
                          as='li'
                          key={essay.name}
                          style={{ listStyle: 'none' }}
                        >
                          <Text>{essay.name}</Text>
                        </Box>
                      ))}
                </Box>
              </Box>
            ))}
          {university.programs.filter(prog => !!prog.supplements.length)
            .length && (
            <Box
              margin={{ bottom: 'xlarge' }}
              border={{ color: 'purple' }}
              width='large'
            >
              <Box
                pad={{ horizontal: 'medium', vertical: 'small' }}
                border={{
                  side: 'bottom',
                  style: 'dashed',
                  size: 'small',
                  color: 'black',
                }}
              >
                <Heading level='3' margin='0'>
                  Programs, Majors, and Scholarships
                </Heading>
              </Box>

              {university.programs &&
                university.programs
                  .filter(prog => !!prog.supplements.length)
                  .map(prog => (
                    <Box
                      margin={{ left: 'small' }}
                      direction='row'
                      justify='between'
                      pad='medium'
                      key={prog.name}
                    >
                      <Text>{prog.name}</Text>
                      <Text>{`${prog.supplements.length} ${
                        prog.supplements.length > 1 ? 'Essays' : 'Essay'
                      }`}</Text>
                    </Box>
                  ))}
            </Box>
          )}
        </Box>
      )}
    </Grommet>
  )
}
export default App
