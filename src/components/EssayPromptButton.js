import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from 'grommet'
import { Edit } from 'grommet-icons'

export const EssayPromptButton = ({ index, setModal }) => {
  return (
    <Box height='16px' justify='center' style={{ cursor: 'pointer' }}>
      <Button
        plain
        pad='none'
        size='xsmall'
        icon={<Edit size='small' />}
        label='Select Prompt'
        gap='small'
        reverse
        onClick={e => {
          setModal(prev => prev.map((ele, idx) => (index === idx ? true : ele)))
        }}
        hoverIndicator='true'
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      />
    </Box>
  )
}

EssayPromptButton.propTypes = {
  index: PropTypes.number.isRequired,
  setModal: PropTypes.func.isRequired,
}
