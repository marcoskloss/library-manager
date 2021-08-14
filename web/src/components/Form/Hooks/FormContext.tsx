import { createContext, forwardRef, ForwardRefRenderFunction, ReactNode, useContext, useImperativeHandle, useRef, useState } from 'react' 
import { ValidationError } from 'yup'

interface IFormContext {
  register: (field: IFormField) => void
  setValue: (name: string, value: any) => boolean,
  setFocus: (name: string) => boolean
  errors: IFormError
}

interface IFormProviderProps {
  children: ReactNode
}

type IFormError = Record<string, string>

export interface IFormRef {
  register: (field: IFormField) => void
  setValue: (name: string, value: any) => boolean
  setFocus: (name: string) => boolean
  getValue<T = any>(name: string): T | undefined
  getData<T = any>(): T
  setFormErrors: (data: ValidationError) => void
  setFormError: (name: string | undefined, message: string) => void
}

interface IFormField {
  name: string
  ref: React.MutableRefObject<any>
  defaultValue?: any;
}

const FormContext = createContext({} as IFormContext)

const FormContextProviderElement: ForwardRefRenderFunction<
  IFormRef, IFormProviderProps
  > = ( { children }, formRef) =>  {
  const formFields = useRef<IFormField[]>([])
  const [ errors, setErrors ] = useState<IFormError>({})

  function getFieldByName( name: string): IFormField | undefined {
    return formFields.current.find(item => item.name === name)
  }

  function register(field: IFormField): void {
    formFields.current.push(field)
  }

  function setValue(name: string, value: any): boolean {
    const fieldRef = getFieldByName(name)?.ref

    if (fieldRef?.current) {
      fieldRef.current.value = value
      return true
    }

    return false
  }

  function getData<T = any>(): T {
    const data: T = {} as T 
    formFields.current.forEach(field => {
      Object.defineProperty(data, field.name, {
        value: field.ref.current?.value ?
          field.ref.current?.value :
          field.defaultValue
     })
    })

    return data 
  }

  function setFocus(name: string): boolean { 
    const fieldRef = getFieldByName(name)?.ref
    if (!fieldRef) return false

    fieldRef.current?.focus()
    return true
  }

  function getValue<T = any>(name: string): T | undefined {
    const field =  getFieldByName(name)

    if (!field) return undefined;

    return field.ref.current?.value ?
      field.ref.current.value :
      field.defaultValue
  }

  function setFormError(name: string | undefined, message: string): void {
    if (!name) return

    setErrors(prevState => {
      prevState[name] = message
      return { ...prevState }
    })
}

  function setFormErrors(data: ValidationError): void {
    data.inner.forEach(error => setFormError(error.path, error.message))
   }

  useImperativeHandle<{}, IFormRef>(formRef, () => ({
    register,
    setValue,
    setFocus,
    getValue,
    getData,
    setFormError,
    setFormErrors
  }))

  return (
    <FormContext.Provider value={{
      register,
      setValue,
      setFocus,
      errors
    }}>
      { children }
    </FormContext.Provider>
  )
}

export function useForm(): IFormContext {
  const context = useContext(FormContext)
  return context
}

export const FormContextProvider = forwardRef(FormContextProviderElement)
