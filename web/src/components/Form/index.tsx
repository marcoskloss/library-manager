import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'
import { FormContextProvider, IFormRef } from './Hooks/FormContext'

interface IFormProps {
  onSubmit: () => Promise<void>
  children: ReactNode
}

const FormElement: ForwardRefRenderFunction<IFormRef,IFormProps> = (
  { children, onSubmit },
  formRef
) => {
  return (
    <FormContextProvider ref={formRef}>
      <form 
        onSubmit={async (ev) => {
          ev.preventDefault()
          await onSubmit()
        }}
      >
        { children }
      </form>
    </FormContextProvider>
  )
}

export const Form = forwardRef(FormElement)
