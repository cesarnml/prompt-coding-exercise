import React, { useState, useEffect } from 'react'
import { Box, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'
export const ApplicationEssays = ({
  appType,
  application_essays,
}) => {
  const [show, setShow] = useState(false)
  const [isHover, setHover] = useState(false)

  useEffect(() => {
    setShow(false)
    setHover(false)
  }, [application_essays])
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
          <Text margin={{ left: 'small' }} size='16px' weight='normal'>
            Application Essays
          </Text>
        </Box>
        <Box width='90px'>
          <Text size='16px' weight='normal'>{`${
            appType === 'Common App' ? application_essays.length : '0'
          } ${
            appType === 'Common App' && application_essays.length > 1
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
                    <Box margin={{ bottom: 'medium', horizontal: 'medium' }}>
                      <Text
                        weight='bold'
                        margin={{ bottom: 'small' }}
                        size='16px'
                      >
                        Instructions:
                      </Text>
                      <Text size='16px'>{essay.instructions}</Text>
                    </Box>
                  )}
                  <Box
                    direction='row'
                    justify='between'
                    margin={{ horizontal: 'medium' }}
                  >
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
                    </Box>
                    <Box width='large'>
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
                        <Text weight='bold' size='16px'>
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
