import { createContext, forwardRef, ForwardRefRenderFunction, ReactNode, useContext, useImperativeHandle, useRef } from 'react' 

interface IFormContext {
  register: (field: IFormField) => void
  setValue: (name: string, value: any) => boolean,
  setFocus: (name: string) => boolean
}

interface IFormProviderProps {
  children: ReactNode
}


export interface IFormRef {
  register: (field: IFormField) => void
  setValue: (name: string, value: any) => boolean
  setFocus: (name: string) => boolean
  getValue<T = any>(name: string): T | undefined
  getData<T = any>(): T
}

interface IFormField {
  name: string
  ref: React.MutableRefObject<any>
}

const FormContext = createContext({} as IFormContext)

const FormContextProviderElement: ForwardRefRenderFunction<
  IFormRef, IFormProviderProps
  > = ( { children }, formRef) =>  {
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

  function getData<T = any>(): T {
    const data: T = {} as T 
    formFields.current.forEach(field => {
      console.log(field)
      Object.defineProperty(data, field.name, {
        value: field.ref.current?.value
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
    return getFieldByName(name)?.ref.current?.value
  }

  useImperativeHandle<{}, IFormRef>(formRef, () => ({
    register,
    setValue,
    setFocus,
    getValue,
    getData
  }))

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

export function useForm(): IFormContext {
  const context = useContext(FormContext)
  return context
}

export const FormContextProvider = forwardRef(FormContextProviderElement)
