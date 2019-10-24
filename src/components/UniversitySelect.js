import React, { useState, useEffect } from 'react'
import { Box, Select, Text } from 'grommet'
import styled from 'styled-components'

const Container = styled(Box)`
  background-color: #2da7a4;
  color: white;
  font-weight: bold;
`

const StyledSelect = styled(Select)`
  background-color: white;
  color: #444;
`

export const UniversitySelect = ({ label, ops, setIped }) => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(ops)
  }, [ops])

  return (
    <Container pad={{ horizontal: 'large', vertical: 'medium' }} align='start'>
      <Box width='medium'>
        <Text
          as='label'
          htmlFor='university-select__input'
          size='1.6rem'
          margin={{ bottom: 'small' }}
        >
          {label}
        </Text>
        <StyledSelect
          id='university-select'
          size='medium'
          dropHeight='medium'
          placeholder='MIT'
          searchPlaceholder='Search a university'
          labelKey='lab'
          valueKey='val'
          value={value}
          options={options}
          onChange={({ option }) => {
            setValue(option)
            setOptions(ops)
            setIped(option.val)
          }}
          onSearch={text => {
            //? escapes special characters to avoid console errors on regexp
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
            const exp = new RegExp(escapedText, 'i')
            setOptions(ops.filter(o => exp.test(o.lab)))
          }}
        />
      </Box>
    </Container>
  )
}
