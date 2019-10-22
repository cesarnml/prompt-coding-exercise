import React from 'react'
import { Box, Text } from 'grommet'
import { Down } from 'grommet-icons'

const EssayCategory = ({ appType, category, university }) => {
  return (
    <Box pad='medium'>
      <Box direction='row' justify='between'>
        <Box direction='row'>
          <Down />
          <Text margin={{ left: 'small' }}>{category}</Text>
        </Box>
        {category === 'Application Essays' ? (
          <Box width='xsmall'>
            <Text>{`${
              appType === 'Common App' ? university.applications.length : '0'
            } ${
              university.applications.length > 1 && appType === 'Common App'
                ? 'Essays'
                : 'Essay'
            }`}</Text>
          </Box>
        ) : null}
        {category === 'Required Supplements' ? (
          <Box width='xsmall'>
            <Text>{`${
              university.supplements
                .filter(supp => supp.applications.includes(appType))
                .filter(supp => supp => !supp.optional).length
            } ${
              university.supplements
                .filter(supp => supp.applications.includes(appType))
                .filter(supp => supp => !supp.optional).length > 1
                ? 'Essays'
                : 'Essay'
            }`}</Text>
          </Box>
        ) : null}
        {category === 'Optional Supplements' ? (
          <Box width='xsmall'>
            <Text>{`${
              university.supplements
                .filter(supp => supp.applications.includes(appType))
                .filter(supp => supp => supp.optional).length
            } ${
              university.supplements
                .filter(supp => supp.applications.includes(appType))
                .filter(supp => supp => supp.optional).length > 1
                ? 'Essays'
                : 'Essay'
            }`}</Text>
          </Box>
        ) : null}
      </Box>
      <Box pad={{ horizontal: 'large' }}>
        <Text>Test</Text>
      </Box>
    </Box>
  )
}

export default EssayCategory
