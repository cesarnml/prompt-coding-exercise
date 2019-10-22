import React, { useState } from 'react'
import { Box, Text } from 'grommet'

const ApplicationEssays = ({ appType, applications, application_essays }) => {
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
        onClick={() => setShow(!show)}
      >
        <Text>Application Essays</Text>
        <Text>{`${appType === 'Common App' ? applications.length : '0'} ${
          applications.length > 1 ? 'Essays' : 'Essay'
        }`}</Text>
      </Box>
      {show && (
        <Box
          as='ul'
          margin={{ horizontal: 'small' }}
          pad={{ left: 'medium' }}
          style={{ border: '1px solid pink' }}
        >
          {appType === 'Common App'
            ? application_essays.map(essay => (
                <Text as='li' key={essay.name} style={{ listStyle: 'none' }}>
                  <Text>{essay.name}</Text>
                </Text>
              ))
            : null}
        </Box>
      )}
    </Box>
  )
}

export default ApplicationEssays
