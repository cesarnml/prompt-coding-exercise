import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Text,
  Button,
  CheckBox,
  Layer,
  Form,
  FormField,
  TextArea,
} from 'grommet'
import { Edit } from 'grommet-icons'
import { stripHtml } from 'utils'
import { UniContext } from 'App'
import { EssayTab } from 'components'

export const EssayRequirements = ({ appType, label, essays }) => {
  const [show, setShow] = useState(false)
  const [hash, setHash] = useState({})
  const [textArea, setTextArea] = useState('')
  const [edit, setEdit] = useState(null)
  const [isModal, setModal] = useState(Array(essays.length).fill(false))
  const { setUniversity } = useContext(UniContext)

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
                    <Box margin={{ bottom: 'medium', horizontal: 'medium' }}>
                      <Text
                        size='16px'
                        weight='bold'
                        margin={{ bottom: 'small' }}
                      >
                        Instructions:
                      </Text>
                      <Text size='16px'>{stripHtml(essay.instructions)}</Text>
                    </Box>
                  )}
                  <Box
                    direction='row'
                    justify='between'
                    margin={{ horizontal: 'medium' }}
                  >
                    <Box width='small' margin={{ right: 'medium' }}>
                      <Box
                        border={{
                          side: 'bottom',
                          size: 'small',
                          color: '#2DA7A1',
                        }}
                        margin={{ bottom: 'small' }}
                      >
                        <Text weight='bold' size='16px'>
                          Details
                        </Text>
                      </Box>
                      <Text size='16px'>
                        {essay.display_length.includes('words')
                          ? `${essay.display_length} max`
                          : essay.display_length}
                      </Text>
                      <Text size='16px'>
                        {essay.optional ? 'Optional' : 'Required'}
                      </Text>
                    </Box>
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
                        <Box direction='row'>
                          <Text weight='bold' size='16px' truncate>
                            {essay.name}
                          </Text>
                          <Box
                            margin={{ left: 'small' }}
                            height='16px'
                            justify='center'
                            background='#2DA7A4'
                            round='small'
                            pad={{ horizontal: 'xsmall' }}
                          >
                            <Text color='white' weight='bold' size='xsmall'>
                              {essay.last_updated === new Date().getFullYear()
                                ? 'Current'
                                : essay.last_updated}
                            </Text>
                          </Box>
                        </Box>
                        {essay.prompts.length > 1 ? (
                          <Box
                            height='16px'
                            justify='center'
                            style={{ cursor: 'pointer' }}
                          >
                            <Button
                              plain
                              pad='none'
                              size='xsmall'
                              icon={<Edit size='small' />}
                              label='Select Prompt'
                              gap='small'
                              reverse
                              onClick={e => {
                                setModal(prev =>
                                  prev.map((ele, idx) =>
                                    index === idx ? true : ele
                                  )
                                )
                              }}
                              hoverIndicator='true'
                              style={{ fontSize: '12px', fontWeight: 'bold' }}
                            />
                            {isModal[index] && (
                              <Layer
                                onEsc={e =>
                                  setModal(prev =>
                                    prev.map((ele, idx) =>
                                      index === idx ? false : ele
                                    )
                                  )
                                }
                                onClickOutside={() =>
                                  setModal(prev =>
                                    prev.map((ele, idx) =>
                                      index === idx ? false : ele
                                    )
                                  )
                                }
                              >
                                <Box
                                  width='xsmall'
                                  alignSelf='end'
                                  margin='small'
                                >
                                  <Button
                                    label='close'
                                    color='#2DA7A4'
                                    onClick={() =>
                                      setModal(prev =>
                                        prev.map((ele, idx) =>
                                          index === idx ? false : ele
                                        )
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
                            )}
                          </Box>
                        ) : null}
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
                              <Form
                                value={{ textarea: textArea }}
                                onSubmit={e => {
                                  const copyEssays = essays.map(ess => {
                                    if (ess.slug === essay.slug) {
                                      const newPrompts = ess.prompts.map(
                                        pro => {
                                          if (pro.slug === slug) {
                                            return {
                                              ...pro,
                                              prompt: e.value.textarea,
                                            }
                                          } else {
                                            return pro
                                          }
                                        }
                                      )
                                      ess.prompts = newPrompts
                                      return ess
                                    }
                                    return ess
                                  })
                                  setUniversity(prev => ({
                                    ...prev,
                                    application_essays: copyEssays,
                                  }))
                                }}
                              >
                                <FormField
                                  component={TextArea}
                                  name='textarea'
                                />
                                <Button label='submit' type='submit' />
                              </Form>
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
