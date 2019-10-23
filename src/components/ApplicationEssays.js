import React, { useState } from 'react'
import { Box, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'
export const ApplicationEssays = ({
  appType,
  applications,
  application_essays,
}) => {
  const [show, setShow] = useState(false)
  const [isHover, setHover] = useState(false)

  const sorted_essays = [...application_essays].sort(
    (a, b) => b.prompts.length - a.prompts.length
  )
  return (
    <Box>
      <Box
        as='h4'
        direction='row'
        justify='between'
        background={isHover ? '#C7E9E5' : 'none'}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        pad='medium'
        onClick={() => setShow(prev => !prev)}
        style={{ cursor: 'pointer' }}
      >
        <Box direction='row' align='center'>
          {show ? <Up size='small' /> : <Down size='small' />}
          <Text margin={{ left: 'small' }}>Application Essays</Text>
        </Box>
        <Box width='90px'>
          <Text>{`${appType === 'Common App' ? applications.length : '0'} ${
            applications.length > 1 && appType === 'Common App'
              ? 'Essays'
              : 'Essay'
          }`}</Text>
        </Box>
      </Box>
      {show && (
        <Box as='ul' margin={{ bottom: 'medium' }}>
          {appType === 'Common App'
            ? sorted_essays.map(essay => (
                <Box as='li' key={essay.name} margin={{ bottom: 'medium' }}>
                  {!!essay.instructions && (
                    <Box margin={{ bottom: 'small', horizontal: 'small' }}>
                      <Text weight='bold' margin={{ bottom: 'small' }}>
                        Instructions:
                      </Text>
                      <Text>{essay.instructions}</Text>
                    </Box>
                  )}
                  <Box direction='row' justify='between'>
                    <Box width='small' margin={{ horizontal: 'small' }}>
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
                    <Box width='large' margin={{ horizontal: 'small' }}>
                      <Box
                        direction='row'
                        align='center'
                        border={{
                          side: 'bottom',
                          size: 'small',
                          color: '#2DA7A1',
                        }}
                        margin={{ bottom: 'small' }}
                      >
                        <Text weight='bold'>{essay.name}</Text>
                        <Box
                          margin={{ left: 'small' }}
                          height='18px'
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
