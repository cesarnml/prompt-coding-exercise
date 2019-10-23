import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Text,
  Button,
  Layer,
  CheckBox,
  TextArea,
  Form,
  FormField,
} from 'grommet'
import { Down, Up, Edit } from 'grommet-icons'
import { stripHtml } from 'utils'
import { UniContext } from 'App'
export const ApplicationEssays = ({ appType, application_essays }) => {
  const [show, setShow] = useState(false)
  const [hash, setHash] = useState({})
  const [textArea, setTextArea] = useState('')
  const [edit, setEdit] = useState(null)
  const [isModal, setModal] = useState(
    Array(application_essays.length).fill(false)
  )
  const [isHover, setHover] = useState(false)
  const value = useContext(UniContext)

  useEffect(() => {
    setHover(false)
    setEdit(null)
    setModal(Array(application_essays.length).fill(false))
    setHash({})
  }, [application_essays])

  const sorted_essays = [...application_essays].sort(
    (a, b) => b.prompts.length - a.prompts.length
  )
  return (
    <Box>
      <Box
        as='h4'
        direction='row'
        justify='between'
        background={isHover ? '#C7E9E5' : 'none'}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        pad='medium'
        onClick={() => setShow(prev => !prev)}
        style={{ cursor: 'pointer' }}
      >
        <Box direction='row' align='center'>
          {show ? <Up size='small' /> : <Down size='small' />}
          <Text margin={{ left: 'small' }} size='16px' weight='normal'>
            Application Essays
          </Text>
        </Box>
        <Box width='90px'>
          <Text size='16px' weight='normal'>{`${
            appType === 'Common App' || appType === 'UC App'
              ? application_essays.length
              : '0'
          } ${
            (appType === 'Common App' || appType === 'UC App') &&
            application_essays.length > 1
              ? 'Essays'
              : 'Essay'
          }`}</Text>
        </Box>
      </Box>
      {show && (
        <Box as='ul' margin={{ bottom: 'medium' }}>
          {appType === 'Common App' || appType === 'UC App'
            ? sorted_essays.map((essay, index) => (
                <Box as='li' key={essay.name} margin={{ bottom: 'medium' }}>
                  {!!essay.instructions && (
                    <Box margin={{ bottom: 'medium', horizontal: 'medium' }}>
                      <Text
                        weight='bold'
                        margin={{ bottom: 'small' }}
                        size='16px'
                      >
                        Instructions:
                      </Text>
                      <Text size='16px'>{essay.instructions}</Text>
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
                              onClick={e => {
                                setModal(prev =>
                                  prev.map((ele, idx) =>
                                    index === idx ? true : ele
                                  )
                                )
                              }}
                              gap='small'
                              reverse
                              hoverIndicator='true'
                              style={{ fontSize: '12px', fontWeight: 'bold' }}
                            />
                            {isModal[index] && (
                              <Layer
                                onEsc={e => {
                                  setModal(prev =>
                                    prev.map((ele, idx) =>
                                      index === idx ? false : ele
                                    )
                                  )
                                }}
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
                                  const copyEssays = application_essays.map(
                                    ess => {
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
                                    }
                                  )
                                  value.setUniversity(prev => ({
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
