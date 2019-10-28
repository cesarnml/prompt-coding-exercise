import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'

export const EssayHeading = ({ essay }) => {
  return (
    <Box direction='row'>
      <Text weight='bold' size='16px' truncate>
        {essay.name}
      </Text>
      <Box
        margin={{ left: 'small' }}
        height='16px'
        justify='center'
        background='#2DA7A4'
        round='small'
        pad={{ horizontal: 'xsmall' }}
      >
        <Text color='white' weight='bold' size='xsmall'>
          {essay.last_updated === new Date().getFullYear()
            ? 'Current'
            : essay.last_updated}
        </Text>
      </Box>
    </Box>
  )
}

EssayHeading.propTypes = {
  essay: PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_updated: PropTypes.number.isRequired,
  }),
}
