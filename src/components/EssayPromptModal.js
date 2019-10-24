import React from 'react'
import { Layer, Box, Button, CheckBox } from 'grommet'
import { stripHtml } from 'utils'

export const EssayPromptModal = ({ index, setModal, essay, hash, setHash }) => {
  return (
    <Layer
      onEsc={e =>
        setModal(prev => prev.map((ele, idx) => (index === idx ? false : ele)))
      }
      onClickOutside={() =>
        setModal(prev => prev.map((ele, idx) => (index === idx ? false : ele)))
      }
    >
      <Box width='xsmall' alignSelf='end' margin='small'>
        <Button
          label='close'
          color='#2DA7A4'
          onClick={() =>
            setModal(prev =>
              prev.map((ele, idx) => (index === idx ? false : ele))
            )
          }
        />
      </Box>

      <Box as='ul' pad='medium'>
        {essay.prompts.map(({ prompt, slug }, i) => (
          <Box margin={{ bottom: 'medium' }} key={i}>
            <CheckBox
              data-essay={essay.slug}
              value={slug}
              color='#2DA7A4'
              checked={hash[essay.slug] === slug}
              label={stripHtml(prompt)}
              onChange={e => {
                e.persist()
                setHash(prev => ({
                  ...prev,
                  [e.target.dataset.essay]: slug,
                }))
              }}
            />
          </Box>
        ))}
      </Box>
    </Layer>
  )
}
