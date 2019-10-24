import React, { useContext } from 'react'
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
