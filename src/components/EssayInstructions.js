import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import { stripHtml } from 'utils'

export const EssayInstructions = ({ instructions }) => {
  return (
    <Box margin={{ bottom: 'medium', horizontal: 'medium' }}>
      <Text size='16px' weight='bold' margin={{ bottom: 'small' }}>
        Instructions:
      </Text>
      <Text size='16px'>{stripHtml(instructions)}</Text>
    </Box>
  )
}

EssayInstructions.propTypes = {
  instructions: PropTypes.string.isRequired,
}
