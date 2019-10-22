import React from 'react'
import { Box, Heading } from 'grommet'
const AppTypeHeader = ({ appType }) => {
  return (
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
  )
}

export default AppTypeHeader
