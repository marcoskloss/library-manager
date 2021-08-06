import React, { FormEvent, ReactNode } from 'react'

interface IFormProps {
  onSubmit: (ev: FormEvent) => void
  children: ReactNode
}

export const Form = React.forwardRef<HTMLFormElement, IFormProps>((
  { onSubmit, children },
  ref
) => {
  return (
    <form onSubmit={onSubmit} ref={ref}>
      { children }
    </form>
  )
})
