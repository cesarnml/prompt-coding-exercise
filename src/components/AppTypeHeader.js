import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'grommet'

export const AppTypeHeader = ({ appType }) => {
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
      <Heading level='4' margin='0'>
        {appType === 'University Application'
          ? 'University-Specific Application'
          : appType}
      </Heading>
    </Box>
  )
}

AppTypeHeader.propTypes = {
  appType: PropTypes.string.isRequired,
}
