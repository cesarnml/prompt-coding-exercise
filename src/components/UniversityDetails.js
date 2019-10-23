import React from 'react'
import { Box, Heading } from 'grommet'
import {
  ProgramDetails,
  ApplicationEssays,
  Supplements,
  AppTypeHeader,
} from 'components'

const hasPrograms = programs => {
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
    <Box
      align='start'
      margin={{ bottom: 'small', horizontal: 'small' }}
      pad={{ bottom: 'medium', horizontal: 'medium' }}
    >
      <Heading
        level='3'
        margin={{ top: 'none' }}
      >{`${label} - ${name}`}</Heading>
      {applications.map((appType, i) => (
        <Box
          key={i}
          margin={{ bottom: 'xlarge' }}
          width='large'
          elevation='small'
        >
          <AppTypeHeader appType={appType} />
          <ApplicationEssays
            appType={appType}
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
      {hasPrograms(programs) && (
        <ProgramDetails
          label='Programs, Majors, and Scholarships'
          programs={programs.filter(prog => !!prog.supplements.length)}
        />
      )}
    </Box>
  )
}
