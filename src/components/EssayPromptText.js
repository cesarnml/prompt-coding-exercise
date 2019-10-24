import React from 'react'
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
