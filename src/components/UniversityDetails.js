import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'grommet'
import { AppTypeHeader, EssayRequirements, ProgramDetails } from 'components'

//* Function that checks if university has Program-Specific essays
const hasPrograms = programs => {
  return !!programs.filter(prog => !!prog.supplements.length).length
}

const getReqSupp = (supplements, appType) => {
  return supplements
    .filter(supp => supp.applications.includes(appType))
    .filter(supp => !supp.optional)
}

const getOptSupp = (supplements, appType) => {
  return supplements
    .filter(supp => supp.applications.includes(appType))
    .filter(supp => supp.optional)
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
      margin='small'
      pad={{ bottom: 'medium', horizontal: 'medium' }}
    >
      <Heading level='1' size='xsmall' margin={{ bottom: 'medium' }}>
        {`${label} - ${name}`}
      </Heading>
      {applications.map((appType, i) => (
        <Box
          key={i}
          margin={{ bottom: 'xlarge' }}
          width='large'
          elevation='small'
        >
          <AppTypeHeader appType={appType} />
          <EssayRequirements
            appType={appType}
            label='Application Essays'
            essays={application_essays}
          />
          <EssayRequirements
            label='Required Supplements'
            appType={appType}
            essays={getReqSupp(supplements, appType)}
          />
          <EssayRequirements
            label='Optional Supplements'
            appType={appType}
            essays={getOptSupp(supplements, appType)}
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

UniversityDetails.propTypes = {
  label: PropTypes.string.isRequired,
  university: PropTypes.shape({
    name: PropTypes.string.isRequired,
    applications: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    application_essays: PropTypes.arrayOf(PropTypes.object.isRequired)
      .isRequired,
    supplements: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    programs: PropTypes.arrayOf(
      PropTypes.shape({
        supplements: PropTypes.array.isRequired,
      })
    ).isRequired,
  }),
}
