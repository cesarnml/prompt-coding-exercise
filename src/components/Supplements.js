import React, { useState, useEffect } from 'react'
import { Box, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'

export const Supplements = ({ appType, label, supplements }) => {
  const [show, setShow] = useState(false)
  const [isHover, setHover] = useState(false)
  useEffect(() => {
    setShow(false)
    setHover(false)
  }, [supplements])
  return (
    <Box>
      <Box
        as='h4'
        direction='row'
        justify='between'
        background={isHover ? '#C7E9E5' : 'none'}
        pad='medium'
        onClick={() => setShow(prev => !prev)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: 'pointer' }}
      >
        <Box direction='row' align='center'>
          {show ? <Up size='small' /> : <Down size='small' />}
          <Text
            margin={{ left: 'small' }}
            size='16px'
            weight='normal'
          >{`${label} Supplements`}</Text>
        </Box>
        <Box width='90px'>
          <Text size='16px' weight='normal'>{`${
            supplements
              .filter(supp => supp.applications.includes(appType))
              .filter(supp =>
                label === 'Required' ? !supp.optional : supp.optional
              ).length
          } ${
            supplements
              .filter(supp => supp.applications.includes(appType))
              .filter(supp =>
                label === 'Required' ? !supp.optional : supp.optional
              ).length > 1
              ? 'Essays'
              : 'Essay'
          }`}</Text>
        </Box>
      </Box>

      {show && (
        <Box as='ul' margin={{ bottom: 'medium' }}>
          {supplements
            .filter(supp =>
              label === 'Required' ? !supp.optional : supp.optional
            )
            .filter(supp => supp.applications.includes(appType))
            .map(essay => (
              <Box as='li' key={essay.name} margin={{ bottom: 'medium' }}>
                {!!essay.instructions && (
                  <Box margin={{ bottom: 'medium', horizontal: 'medium' }}>
                    <Text
                      size='16px'
                      weight='bold'
                      margin={{ bottom: 'small' }}
                    >
                      Instructions:
                    </Text>
                    <Text
                      margin={
                        essay.instructions.includes('<p>')
                          ? { top: '-20px' }
                          : 'none'
                      }
                      dangerouslySetInnerHTML={{ __html: essay.instructions }}
                    />
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
                          dangerouslySetInnerHTML={{ __html: prompt }}
                          as='li'
                          key={prompt}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}
