import React, { useState, useEffect } from 'react'
import { Box, Select, Text } from 'grommet'

export const UniversitySelect = ({ label, ops, setIped }) => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(ops)
  }, [ops])

  return (
    <Box margin='small' pad='medium' align='start'>
      <Box width='medium'>
        <Text as='label' htmlFor='university-select__input'>
          {label}
        </Text>
        <Select
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
    </Box>
  )
}
