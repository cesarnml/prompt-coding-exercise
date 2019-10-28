import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Form, FormField, Button, TextArea } from 'grommet'
import { UniContext } from 'App'

export const EssayPromptForm = ({ essay, slug, essays, textArea }) => {
  const { setUniversity } = useContext(UniContext)

  return (
    <Form
      value={{ textarea: textArea }}
      onSubmit={e => {
        const copyEssays = essays.map(ess => {
          if (ess.slug === essay.slug) {
            const newPrompts = ess.prompts.map(pro => {
              if (pro.slug === slug) {
                return {
                  ...pro,
                  prompt: e.value.textarea,
                }
              } else {
                return pro
              }
            })
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
      <FormField component={TextArea} name='textarea' />
      <Button label='submit' type='submit' />
    </Form>
  )
}

EssayPromptForm.propTypes = {
  essay: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
  essays: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      prompts: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  slug: PropTypes.string.isRequired,
  textArea: PropTypes.string.isRequired,
}
