import React, { useState, useEffect } from 'react'
import { Box, Text } from 'grommet'
import { stripHtml } from 'utils'

import {
  EssayTab,
  EssayInstructions,
  EssayDetails,
  EssayHeading,
  EssayPromptButton,
  EssayPromptModal,
  EssayPromptForm,
} from 'components'

export const EssayRequirements = ({ appType, label, essays }) => {
  const [show, setShow] = useState(false)
  const [hash, setHash] = useState({})
  const [textArea, setTextArea] = useState('')
  const [edit, setEdit] = useState(null)
  const [isModal, setModal] = useState(Array(essays.length).fill(false))

  useEffect(() => {
    setHash({})
    setEdit(null)
    setModal(Array(essays.length).fill(false))
  }, [essays])

  //* Display essays with most prompts first
  const sortedEssays = [...essays].sort(
    (a, b) => b.prompts.length - a.prompts.length
  )

  //* Needed because of odd way of determining appType of app_essays
  const displayEssays =
    appType === 'Common App' ||
    appType === 'UC App' ||
    label.includes('Supplements')

  return (
    <Box>
      <EssayTab
        label={label}
        appType={appType}
        essays={essays}
        show={show}
        setShow={setShow}
      />
      {show && (
        <Box as='ul' margin={{ bottom: 'medium' }}>
          {displayEssays
            ? sortedEssays.map((essay, index) => (
                <Box as='li' key={index} margin={{ bottom: 'medium' }}>
                  {!!essay.instructions && (
                    <EssayInstructions instructions={essay.instructions} />
                  )}
                  <Box
                    direction='row'
                    justify='between'
                    margin={{ horizontal: 'medium' }}
                  >
                    <EssayDetails essay={essay} />
                    <Box width='large'>
                      <Box
                        direction='row'
                        justify='between'
                        align='center'
                        border={{
                          side: 'bottom',
                          size: 'small',
                          color: '#2DA7A1',
                        }}
                        margin={{ bottom: 'small' }}
                      >
                        <EssayHeading essay={essay} />
                        {essay.prompts.length > 1 && (
                          <EssayPromptButton
                            index={index}
                            setModal={setModal}
                          />
                        )}
                        {isModal[index] && (
                          <EssayPromptModal
                            index={index}
                            essay={essay}
                            hash={hash}
                            setHash={setHash}
                            setModal={setModal}
                          />
                        )}
                      </Box>
                      <Box as='ul'>
                        {essay.prompts.map(({ prompt, slug }, i) => (
                          <Box
                            as='li'
                            key={i}
                            data-slug={slug}
                            onClick={e => {
                              setTextArea(stripHtml(prompt))
                              setEdit(e.currentTarget.dataset.slug)
                            }}
                          >
                            {edit !== slug ? (
                              <Text
                                size='16px'
                                style={
                                  essay.prompts.length > 1
                                    ? {
                                        fontWeight:
                                          hash[essay.slug] === slug
                                            ? 'bold'
                                            : 'normal',
                                        color:
                                          hash[essay.slug] === slug
                                            ? '#2DA7A4'
                                            : 'black',
                                        cursor: 'pointer',
                                      }
                                    : { cursor: 'pointer' }
                                }
                                dangerouslySetInnerHTML={{ __html: prompt }}
                              />
                            ) : (
                              <EssayPromptForm
                                essay={essay}
                                slug={slug}
                                essays={essays}
                                textArea={textArea}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            : null}
        </Box>
      )}
    </Box>
  )
}
