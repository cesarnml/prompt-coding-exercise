import React from 'react'
import { Box, Heading } from 'grommet'
import EssayCategory from './EssayCategory'

const ESSAY_CATEGORIES = [
  'Application Essays',
  'Required Supplements',
  'Optional Supplements',
]

const renderAppTypeHeading = appType => {
  return appType === 'University Application'
    ? 'University-Specific Application'
    : appType
}

const ApplicationDetails = ({ appType, university }) => {
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
        <Heading level='3' margin='none'>
          {renderAppTypeHeading(appType)}
        </Heading>
      </Box>
      {ESSAY_CATEGORIES.map(category => (
        <EssayCategory
          key={category}
          category={category}
          appType={appType}
          university={university}
        />
      ))}
    </Box>
  )
}

export default ApplicationDetails
