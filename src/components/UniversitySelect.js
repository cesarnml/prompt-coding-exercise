import React from 'react'
import { Box, Select, Heading } from 'grommet'

const UniversitySelect = ({
  label,
  value,
  options,
  defaults,
  setValue,
  setOptions,
}) => {
  return (
    <Box margin='small' pad='medium' align='start' border={{ color: 'red' }}>
      <Heading level='2'>{label}</Heading>
      <Box width='medium'>
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
  )
}

export default UniversitySelect
