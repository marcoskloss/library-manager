import {InputHTMLAttributes, useEffect, useRef} from "react"
import {useForm} from "../../Form/Hooks/FormContext"
import baseInput from '../input.module.scss'

interface IInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export function InputText({ name, label, ...rest }: IInputTextProps) {
  const { register, errors } = useForm()

  const ref = useRef<HTMLInputElement>(null)
  const errorMessage = errors[name]

  useEffect(() => {
    register({ ref, name })
  }, [register, name])

  return (
    <>
      <label htmlFor={name}>{ label }</label>
      <input 
        type='text'
        id={name} 
        ref={ref} 
        {...rest} 
      />
      { errorMessage  && (
        <span className={baseInput.errorSpan}>{ errorMessage }</span>
      )}
    </>
  )
}
