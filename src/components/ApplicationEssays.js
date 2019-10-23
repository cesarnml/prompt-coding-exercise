import React, { useState, useEffect } from 'react'
import { Box, Text, Button, Layer, CheckBox } from 'grommet'
import { Down, Up, Edit } from 'grommet-icons'
import { stripHtml } from 'utils'
export const ApplicationEssays = ({ appType, application_essays }) => {
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState(false)

  const [isModal, setModal] = useState(
    Array(application_essays.length).fill(false)
  )
  const [isHover, setHover] = useState(false)

  useEffect(() => {
    setShow(false)
    setHover(false)
    setModal(Array(application_essays.length).fill(false))
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
            appType === 'Common App' ? application_essays.length : '0'
          } ${
            appType === 'Common App' && application_essays.length > 1
              ? 'Essays'
              : 'Essay'
          }`}</Text>
        </Box>
      </Box>
      {show && (
        <Box as='ul' margin={{ bottom: 'medium' }}>
          {appType === 'Common App'
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
                              onClick={() =>
                                setModal(prev =>
                                  prev.map((ele, idx) =>
                                    index === idx ? true : ele
                                  )
                                )
                              }
                              gap='small'
                              reverse
                              hoverIndicator='true'
                              style={{ fontSize: '12px', fontWeight: 'bold' }}
                            />
                            {isModal[index] && (
                              <Layer
                                onEsc={() =>
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
                                  {essay.prompts.map(({ prompt }) => (
                                    <Box margin={{ bottom: 'medium' }}>
                                      <CheckBox
                                        checked={checked}
                                        label={stripHtml(prompt)}
                                        onChange={e =>
                                          setChecked(e.target.checked)
                                        }
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
                        {essay.prompts.map(({ prompt }) => (
                          <Box
                            as='li'
                            key={prompt}
                            margin={{ bottom: 'small' }}
                          >
                            <Text size='16px'>{stripHtml(prompt)}</Text>
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
