import React, { useState } from 'react'
import { Box, Text } from 'grommet'

export const ApplicationEssays = ({
  appType,
  applications,
  application_essays,
}) => {
  const [show, setShow] = useState(false)

  const sorted_essays = [...application_essays].sort(
    (a, b) => b.prompts.length - a.prompts.length
  )
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
        <Text>Application Essays</Text>
        <Text>{`${appType === 'Common App' ? applications.length : '0'} ${
          applications.length > 1 ? 'Essays' : 'Essay'
        }`}</Text>
      </Box>
      {show && (
        <Box
          as='ul'
          margin={{ horizontal: 'small', bottom: 'medium' }}
          pad={{ left: 'medium' }}
          style={{ border: '1px solid pink' }}
        >
          {appType === 'Common App'
            ? sorted_essays.map(essay => (
                <Box as='li' key={essay.name} margin={{ bottom: 'medium' }}>
                  <div>{console.log(essay.name)}</div>

                  {!!essay.instructions && (
                    <Box margin={{ bottom: 'small' }}>
                      <Text weight='bold' margin={{ bottom: 'small' }}>
                        Instructions:
                      </Text>
                      <Text>{essay.instructions}</Text>
                    </Box>
                  )}
                  <Box direction='row' justify='between'>
                    <Box width='small'>
                      <Box
                        border={{
                          side: 'bottom',
                          size: 'small',
                          color: '#2DA7A1',
                        }}
                        margin={{ bottom: 'small' }}
                      >
                        <Text weight='bold'>Details</Text>
                      </Box>
                      <Text>
                        {essay.display_length.includes('words')
                          ? `${essay.display_length} max`
                          : essay.display_length}
                      </Text>
                    </Box>
                    <Box width='large' margin={{ right: 'small' }}>
                      <Box
                        border={{
                          side: 'bottom',
                          size: 'small',
                          color: '#2DA7A1',
                        }}
                        margin={{ bottom: 'small' }}
                      >
                        <Text weight='bold'>{essay.name}</Text>
                      </Box>
                      <Box as='ul'>
                        {essay.prompts.map(({ prompt }) => (
                          <Box
                            margin={
                              prompt.includes('<p>') ? { top: '-20px' } : 'none'
                            }
                            as='li'
                            key={prompt}
                            dangerouslySetInnerHTML={{ __html: prompt }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            : null}
        </Box>
      )}
    </Box>
  )
}
