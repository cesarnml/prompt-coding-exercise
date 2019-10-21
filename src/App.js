import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { grommet } from 'grommet/themes'
import { Box, Grommet, Select, FormField, Heading } from 'grommet'

const App = () => {
  const [options, setOptions] = useState([])
  const [defaults, setDefaults] = useState([])
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const [university, setUniversity] = useState({})
  const [objects, setObjects] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/universities`)
      .then(response => {
        setObjects(
          response.data.map(ele => ({
            value: ele.iped,
            label: ele.name,
          }))
        )
        setDefaults(response.data.map(ele => ele.name))
        setOptions(response.data.map(ele => ele.name))
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (!!value && parseInt(objects.length)) {
      axios
        .get(
          `https://content-staging.prompt.com/api/data/university/${
            objects.find(obj => obj.label === value)['value']
          }/`,
          {
            headers: {
              Authorization: `Token ${process.env.REACT_APP_PROMPT_TOKEN}`,
            },
          }
        )
        .then(res => setUniversity(res.data))
    }
  }, [value, objects])
  return (
    <Grommet full theme={grommet}>
      <Box align='center' justify='start' pad='medium'>
        <FormField label='Search for a school to add'>
          <Select
            size='medium'
            dropHeight='medium'
            placeholder='Select a university'
            searchPlaceholder='Search a university'
            value={value}
            options={options || []}
            onChange={({ option }) => {
              setValue(option)
              setValue2('')
            }}
            onClose={() => setOptions(defaults)}
            onSearch={text => {
              //? escapes special characters to avoid console errors on regexp
              const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
              const exp = new RegExp(escapedText, 'i')
              setOptions(defaults.filter(o => exp.test(o)))
            }}
          />
        </FormField>
      </Box>
      {!!value && (
        <Box>
          <h2>Select Application and Optional Essays</h2>
          <Box align='center' justify='start' pad='medium'>
            <FormField
              htmlFor='application-type'
              label='          Select Your Application'
            >
              <Select
                id='application-type'
                size='medium'
                dropHeight='medium'
                placeholder='Select application type'
                disabled={
                  !value && !Object.keys(university).length ? true : false
                }
                value={value2}
                options={university.applications || []}
                onChange={({ option }) => setValue2(option)}
                onClose={() => setOptions(defaults)}
              />
            </FormField>
          </Box>
        </Box>
      )}
      {!!value && (
        <label htmlFor='application-type'>
          Required Essays{' '}
          <span>
            <strong>
              (
              {university.application_essays &&
                [
                  ...university.supplements,
                  ...university.application_essays,
                ].filter(essay => !essay.optional).length}
              )
            </strong>
          </span>
        </label>
      )}
      {!!university.supplements && !!university.application_essays && (
        <>
          <Heading alignSelf='center'>{university.name}</Heading>
          <pre>
            {JSON.stringify(
              [
                ...university.supplements,
                ...university.application_essays,
              ].filter(essay => !essay.optional),
              null,
              2
            )}
          </pre>
        </>
      )}
    </Grommet>
  )
}
export default App
