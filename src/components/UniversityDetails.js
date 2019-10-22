import React from 'react'
import { Box, Heading } from 'grommet'
import ProgramDetails from './ProgramDetails'
import ApplicationEssays from './ApplicationEssays'
import RequiredSupplements from './RequiredSupplements'
import OptionalSupplements from './OptionalSupplements'
import AppTypeHeader from './AppTypeHeader'

const countPrograms = programs => {
  return !!programs.filter(prog => !!prog.supplements.length).length
}

const UniversityDetails = ({ label, university }) => {
  const {
    name,
    applications,
    programs,
    supplements,
    application_essays,
  } = university

  return (
    <Box align='start' margin='small' pad='medium' border={{ color: 'green' }}>
      <Heading level='3'>{`${label} - ${name}`}</Heading>
      {applications.map(appType => (
        <Box
          key={appType}
          margin={{ bottom: 'xlarge' }}
          border={{ color: 'purple' }}
          width='large'
        >
          <AppTypeHeader appType={appType} />
          <ApplicationEssays
            appType={appType}
            applications={applications}
            application_essays={application_essays}
          />
          <RequiredSupplements appType={appType} supplements={supplements} />
          <OptionalSupplements appType={appType} supplements={supplements} />
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

export default UniversityDetails
