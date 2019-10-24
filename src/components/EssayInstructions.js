import React from 'react'

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
