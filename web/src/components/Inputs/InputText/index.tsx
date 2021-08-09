import {InputHTMLAttributes, useEffect, useRef} from "react";
import {useForm} from "../../Form/Hooks/FormContext";

interface IInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function InputText({ name, ...rest }: IInputTextProps) {
  const { register } = useForm()

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    register({ ref, name })
  }, [])

  return (
    <input id={name} ref={ref} {...rest} />
  )
}
