import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'

export const EssayDetails = ({ essay }) => {
  return (
    <Box width='small' margin={{ right: 'medium' }}>
      <Box
        border={{
          side: 'bottom',
          size: 'small',
          color: '#2DA7A1',
        }}
        margin={{ bottom: 'small' }}
      >
        <Text weight='bold' size='16px'>
          Details
        </Text>
      </Box>
      <Text size='16px'>
        {essay.display_length.includes('words')
          ? `${essay.display_length} max`
          : essay.display_length}
      </Text>
      <Text size='16px'>{essay.optional ? 'Optional' : 'Required'}</Text>
    </Box>
  )
}

EssayDetails.propTypes = {
  essay: PropTypes.shape({
    display_length: PropTypes.string.isRequired,
    optional: PropTypes.bool.isRequired,
  }),
}
