import React, { useState, useEffect } from 'react'
import { Box, Text, Button, CheckBox, Layer } from 'grommet'
import { Down, Up, Edit } from 'grommet-icons'
import { stripHtml } from 'utils'

export const Supplements = ({ appType, label, supplements }) => {
  const [show, setShow] = useState(false)
  const [isHover, setHover] = useState(false)
  const [checked, setChecked] = useState(false)

  const [isModal, setModal] = useState(Array(supplements.length).fill(false))

  useEffect(() => {
    setShow(false)
    setHover(false)
    setModal(Array(supplements.length).fill(false))
  }, [supplements])
  return (
    <Box>
      <Box
        as='h4'
        direction='row'
        justify='between'
        background={isHover ? '#C7E9E5' : 'none'}
        pad='medium'
        onClick={() => setShow(prev => !prev)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: 'pointer' }}
      >
        <Box direction='row' align='center'>
          {show ? <Up size='small' /> : <Down size='small' />}
          <Text
            margin={{ left: 'small' }}
            size='16px'
            weight='normal'
          >{`${label} Supplements`}</Text>
        </Box>
        <Box width='90px'>
          <Text size='16px' weight='normal'>{`${
            supplements
              .filter(supp => supp.applications.includes(appType))
              .filter(supp =>
                label === 'Required' ? !supp.optional : supp.optional
              ).length
          } ${
            supplements
              .filter(supp => supp.applications.includes(appType))
              .filter(supp =>
                label === 'Required' ? !supp.optional : supp.optional
              ).length > 1
              ? 'Essays'
              : 'Essay'
          }`}</Text>
        </Box>
      </Box>

      {show && (
        <Box as='ul' margin={{ bottom: 'medium' }}>
          {supplements
            .filter(supp =>
              label === 'Required' ? !supp.optional : supp.optional
            )
            .filter(supp => supp.applications.includes(appType))
            .map((essay, index) => (
              <Box as='li' key={essay.name} margin={{ bottom: 'medium' }}>
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
                            onClick={() =>
                              setModal(prev =>
                                prev.map((ele, idx) =>
                                  index === idx ? true : ele
                                )
                              )
                            }
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
                                {essay.prompts.map(({ prompt }, idx) => (
                                  <Box
                                    margin={{ bottom: 'medium' }}
                                    justify='start'
                                  >
                                    <CheckBox
                                      id={idx}
                                      checked={Number(checked) === idx}
                                      label={stripHtml(prompt)}
                                      onChange={e => setChecked(e.target.id)}
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
                      {essay.prompts.map(({ prompt }, idx) => (
                        <Box as='li' key={prompt}>
                          <Text
                            style={
                              essay.prompts.length > 1
                                ? {
                                    fontWeight:
                                      Number(checked) === idx
                                        ? 'bold'
                                        : 'normal',
                                    color:
                                      Number(checked) === idx
                                        ? '#2DA7A4'
                                        : 'black',
                                  }
                                : {}
                            }
                            size='16px'
                            dangerouslySetInnerHTML={{ __html: prompt }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  )
}
