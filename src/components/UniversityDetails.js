import React from 'react'
import { Box, Heading } from 'grommet'
import {
  ProgramDetails,
  ApplicationEssays,
  Supplements,
  AppTypeHeader,
} from 'components'

const countPrograms = programs => {
  return !!programs.filter(prog => !!prog.supplements.length).length
}

export const UniversityDetails = ({ label, university }) => {
  const {
    name,
    applications,
    programs,
    supplements,
    application_essays,
  } = university

  return (
    <Box align='start' margin='small' pad='medium'>
      <Heading level='3'>{`${label} - ${name}`}</Heading>
      {applications.map(appType => (
        <Box
          key={appType}
          margin={{ bottom: 'xlarge' }}
          width='large'
          elevation='small'
        >
          <AppTypeHeader appType={appType} />
          <ApplicationEssays
            appType={appType}
            applications={applications}
            application_essays={application_essays}
          />
          <Supplements
            label='Required'
            appType={appType}
            supplements={supplements}
          />
          <Supplements
            label='Optional'
            appType={appType}
            supplements={supplements}
          />
        </Box>
      ))}
      {countPrograms(programs) && (
        <ProgramDetails
          label='Programs, Majors, and Scholarships'
          programs={programs.filter(prog => !!prog.supplements.length)}
        />
      )}
    </Box>
  )
}
