import React, { useState, useEffect } from 'react'
import { Box, Heading, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'
import { stripHtml } from 'utils'

//TODO: Fix hard-coded "All Applications"

export const ProgramDetails = ({ label, programs }) => {
  const [show, setShow] = useState(Array(programs.length).fill(false))
  const [isHover, setHover] = useState(Array(programs.length).fill(false))

  useEffect(() => {
    setShow(Array(programs.length).fill(false))
    setHover(Array(programs.length).fill(false))
  }, [programs])

  return (
    <Box margin={{ bottom: 'xlarge' }} width='large' elevation='small'>
      <Box
        pad={{ horizontal: 'medium', vertical: 'small' }}
        border={{
          side: 'bottom',
          style: 'dashed',
          size: 'small',
          color: 'black',
        }}
      >
        <Heading level='4' margin='0'>
          {label}
        </Heading>
      </Box>

      {programs.map((prog, index) => (
        <Box key={prog.name}>
          <Box
            style={{ cursor: 'pointer' }}
            as='h4'
            direction='row'
            justify='between'
            pad='medium'
            onClick={() =>
              setShow(prev =>
                prev.map((ele, idx) => (idx === index ? !ele : ele))
              )
            }
            background={isHover[index] ? '#C7E9E5' : 'none'}
            onMouseEnter={() => {
              setHover(prev =>
                prev.map((ele, idx) => (index === idx ? true : false))
              )
            }}
            onMouseLeave={() => {
              setHover(prev =>
                prev.map((ele, idx) => (index === idx ? false : ele))
              )
            }}
          >
            <Box direction='row' align='center' width='medium'>
              {show[index] ? <Up size='small' /> : <Down size='small' />}
              <Text margin={{ left: 'small' }} size='16px' weight='normal'>
                {prog.name}
              </Text>
            </Box>
            <Box width='90px'>
              <Text size='16px' weight='normal'>{`${prog.supplements.length} ${
                prog.supplements.length > 1 ? 'Essays' : 'Essay'
              }`}</Text>
            </Box>
          </Box>
          {show[index] && (
            <Box pad='medium' margin={{ horizontal: 'medium' }}>
              {prog.supplements.map(supp => (
                <Box
                  direction='row'
                  key={supp.name}
                  margin={{ bottom: 'medium' }}
                >
                  <Box width='small' margin={{ right: 'medium' }}>
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
                        Details
                      </Text>
                    </Box>
                    <Text size='16px'>{`${supp.display_length} max`}</Text>
                    <Text size='16px'>
                      {supp.optional ? 'Optional' : 'Required'}
                    </Text>

                    <Text size='16px'>All Applications</Text>
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
                      <Text weight='bold' size='16px' truncate>
                        {supp.name}
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
                          {supp.last_updated === new Date().getFullYear()
                            ? 'Current'
                            : supp.last_updated}
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      {supp.prompts.map(({ prompt }) => (
                        <Box as='li' key={prompt} margin={{ bottom: 'small' }}>
                          <Text size='16px'>{stripHtml(prompt)}</Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
