import {InputHTMLAttributes, useEffect, useRef} from "react";
import {useForm} from "../../Form/Hooks/FormContext";

interface IInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export function InputText({ name, label, ...rest }: IInputTextProps) {
  const { register, errors } = useForm()

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    register({ ref, name })
  }, [register, name])

  return (
    <>
      <label htmlFor={name}>{ label }</label>
      <input id={name} ref={ref} {...rest} />
      { errors[name] && (
        <span>{ errors[name] }</span>
      )}
    </>
  )
}
