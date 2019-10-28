import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'

const renderEssayCount = (appType, essays) => {
  //* app_essays vs supplements treated slightly different
  const isAppEssay = appType === 'Common App' || appType === 'UC App'
  if (isAppEssay) {
    return (
      <Text size='16px' weight='normal'>{`${isAppEssay ? essays.length : '0'} ${
        isAppEssay && essays.length > 1 ? 'Essays' : 'Essay'
      }`}</Text>
    )
  } else {
    return (
      <Text size='16px' weight='normal'>{`${essays.length} ${
        essays.length > 1 ? 'Essays' : 'Essay'
      }`}</Text>
    )
  }
}

export const EssayTab = ({ label, appType, essays, show, setShow }) => {
  const [hover, setHover] = useState(false)

  return (
    <Box
      as='h4'
      direction='row'
      justify='between'
      background={hover ? '#C7E9E5' : 'none'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setShow(prev => !prev)}
      pad='medium'
      style={{ cursor: 'pointer' }}
    >
      <Box direction='row' align='center'>
        {show ? <Up size='small' /> : <Down size='small' />}
        <Text margin={{ left: 'small' }} size='16px' weight='normal'>
          {label}
        </Text>
      </Box>
      <Box width='90px'>{renderEssayCount(appType, essays)}</Box>
    </Box>
  )
}

EssayTab.propTypes = {
  label: PropTypes.string.isRequired,
  appType: PropTypes.string.isRequired,
  essays: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
}
