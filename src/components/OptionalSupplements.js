import React, { useState } from 'react'
import { Box, Text } from 'grommet'

export const OptionalSupplements = ({ appType, supplements }) => {
  const [show, setShow] = useState(false)
  return (
    <Box>
      <Box
        as='h4'
        direction='row'
        justify='between'
        margin={{ horizontal: 'small' }}
        border={{ color: 'green' }}
        pad='medium'
        onClick={() => setShow(prev => !prev)}
      >
        <Text>Optional Supplements</Text>
        <Text>{`${
          supplements
            .filter(supp => supp.applications.includes(appType))
            .filter(supp => supp.optional).length
        } Essays`}</Text>
      </Box>

      {show && (
        <Box
          as='ul'
          margin={{ horizontal: 'small' }}
          pad={{ left: 'medium' }}
          style={{ border: '1px solid pink' }}
        >
          {supplements
            .filter(supp => supp.optional)
            .filter(supp => supp.applications.includes(appType))
            .map(essay => (
              <Box as='li' key={essay.name} style={{ listStyle: 'none' }}>
                <Text>{essay.name}</Text>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}
