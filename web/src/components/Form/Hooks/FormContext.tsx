import { createContext, ReactNode, useRef } from 'react' 

interface IFormContext {
  register: (field: IFormField) => void
    setValue: (name: string, value: any) => boolean,
    setFocus: (name: string) => boolean
}

interface IFormProviderProps {
  children: ReactNode
}

interface IFormField {
  name: string
  ref: React.MutableRefObject<any>
}

const FormContext = createContext({} as IFormContext)

export function FormContextProvider({ children }: IFormProviderProps) {
  const formFields = useRef<IFormField[]>([])

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

  function setFocus(name: string): boolean { 
    const fieldRef = getFieldByName(name)?.ref
    if (!fieldRef) return false

    fieldRef.current?.focus()
    return true
  }

  return (
    <FormContext.Provider value={{
      register,
      setValue,
      setFocus
    }}>
      { children }
    </FormContext.Provider>
  )
}
