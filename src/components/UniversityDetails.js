import React from 'react'
import { Box, Heading } from 'grommet'
import {
  AppTypeHeader,
  ApplicationEssays,
  Supplements,
  ProgramDetails,
} from 'components'

//* Function that checks if university has Program-Specific essays
const hasPrograms = programs => {
  return !!programs.filter(prog => !!prog.supplements.length).length
}

export const UniversityDetails = ({ label, university }) => {
  const {
    name,
    applications,
    application_essays,
    supplements,
    programs,
  } = university

  return (
    <Box
      align='start'
      as='article'
      margin={{ bottom: 'small', horizontal: 'small' }}
      pad={{ bottom: 'medium', horizontal: 'medium' }}
    >
      <Heading
        level='1'
        size='xsmall'
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
            label='Application Essays'
            essays={application_essays}
          />
          <Supplements
            label='Required Supplements'
            appType={appType}
            essays={supplements}
          />
          <Supplements
            label='Optional Supplements'
            appType={appType}
            essays={supplements}
          />
        </Box>
      ))}
      {hasPrograms(programs) && (
        <ProgramDetails
          label='Programs, Majors, and Scholarships'
          appType='Programs-Specific'
          programs={programs.filter(prog => !!prog.supplements.length)}
        />
      )}
    </Box>
  )
}
