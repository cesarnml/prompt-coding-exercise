import React, { useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'

export const ProgramDetails = ({ label, programs }) => {
  const [show, setShow] = useState(Array(programs.length).fill(false))
  const [isHover, setHover] = useState(Array(programs.length).fill(false))
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
        <Heading level='3' margin='0'>
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
            <Box direction='row' align='center'>
              {show[index] ? <Up size='small' /> : <Down size='small' />}
              <Text margin={{ left: 'small' }}>{prog.name}</Text>
            </Box>
            <Box width='90px'>
              <Text>{`${prog.supplements.length} ${
                prog.supplements.length > 1 ? 'Essays' : 'Essay'
              }`}</Text>
            </Box>
          </Box>
          {show[index] && (
            <Box pad='medium' margin={{ horizontal: 'medium' }}>
              {prog.supplements.map(supp => (
                <Box direction='row' key={supp.name}>
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
