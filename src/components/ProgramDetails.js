import React, { useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'

export const ProgramDetails = ({ label, programs }) => {
  const [show, setShow] = useState(Array(programs.length).fill(false))
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
        <Box>
          <Box
            as='h4'
            direction='row'
            justify='between'
            pad='medium'
            key={prog.name}
            onClick={() =>
              setShow(prev =>
                prev.map((ele, idx) => (idx === index ? !ele : ele))
              )
            }
          >
            <Box direction='row' align='center'>
              {show[index] ? <Up size='small' /> : <Down size='small' />}
              <Text margin={{ left: 'small' }}>{prog.name}</Text>
            </Box>

            <Text>{`${prog.supplements.length} ${
              prog.supplements.length > 1 ? 'Essays' : 'Essay'
            }`}</Text>
          </Box>
          {show[index] && (
            <Box pad='medium' margin={{ horizontal: 'medium' }}>
              {prog.supplements.map(supp => (
                <Box direction='row'>
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
                      <Text weight='bold'>Details</Text>
                    </Box>
                    <Text>{`${supp.display_length} max`}</Text>
                    <Text>{supp.optional ? 'Optional' : 'Required'}</Text>
                    <Text>All Applications</Text>
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
                      <Text weight='bold'>{supp.name}</Text>
                    </Box>
                    <Box>
                      {supp.prompts.map(({ prompt }) => (
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
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
