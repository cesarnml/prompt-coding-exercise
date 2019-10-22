import React from 'react'
import { Box, Heading, Text } from 'grommet'

export const ProgramDetails = ({ label, programs }) => {
  return (
    <Box margin={{ bottom: 'xlarge' }} width='large' elevation='small'>
      <Box
        pad={{ horizontal: 'medium', vertical: 'small' }}
        border={{
          side: 'bottom',
          style: 'dashed',
          size: 'small',
          color: 'black',
        }}
      >
        <Heading level='4' margin='0'>
          {label}
        </Heading>
      </Box>

      {programs.map(prog => (
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
  )
}
