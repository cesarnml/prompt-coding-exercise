import React from 'react'
import { Box, Heading } from 'grommet'
import ApplicationDetails from './ApplicationDetails'
import ProgramDetails from './ProgramDetails'

const UniversityDetails = ({ label, university }) => {
  return (
    <Box align='start' margin='small' pad='medium' border={{ color: 'green' }}>
      <Heading level='3'>{`${label} - ${university.name}`}</Heading>
      {university.applications.map(appType => (
        <ApplicationDetails
          key={appType}
          appType={appType}
          university={university}
        />
      ))}
      {!!university.programs.filter(prog => !!prog.supplements.length)
        .length && (
        <ProgramDetails
          label='Programs, Majors, and Scholarships'
          programs={university.programs.filter(
            prog => !!prog.supplements.length
          )}
        />
      )}
    </Box>
  )
}

export default UniversityDetails
