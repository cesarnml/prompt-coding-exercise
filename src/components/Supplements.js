import React, { useState } from 'react'
import { Box, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'

export const Supplements = ({ appType, label, supplements }) => {
  const [show, setShow] = useState(false)
  const [isHover, setHover] = useState(false)

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
          <Text margin={{ left: 'small' }}>{`${label} Supplements`}</Text>
        </Box>
        <Box width='90px'>
          <Text>{`${
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
        <Box as='ul' margin={{ horizontal: 'small' }} pad={{ left: 'medium' }}>
          {supplements
            .filter(supp =>
              label === 'Required' ? !supp.optional : supp.optional
            )
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
