import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'grommet'
export const EssayPromptText = ({ essay, hash, slug, prompt }) => {
  return (
    <Text
      size='16px'
      style={
        essay.prompts.length > 1
          ? {
              fontWeight: hash[essay.slug] === slug ? 'bold' : 'normal',
              color: hash[essay.slug] === slug ? '#2DA7A4' : 'black',
              cursor: 'pointer',
            }
          : { cursor: 'pointer' }
      }
      dangerouslySetInnerHTML={{ __html: prompt }}
    />
  )
}

EssayPromptText.propTypes = {
  essay: PropTypes.shape({
    prompts: PropTypes.array.isRequired,
    hash: PropTypes.object,
    slug: PropTypes.string.isRequired,
    prompt: PropTypes.string,
  }),
}
