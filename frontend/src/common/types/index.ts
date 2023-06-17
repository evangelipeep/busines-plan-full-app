import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form"

export interface IPropsLogin<
TFieldValues extends FieldValues = FieldValues,
TContext = any,
> {
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
}

export interface IPropsRegister {
    setLogin: ( value: string ) => void
    setEmail: ( value: string ) => void
    setPassword: ( value: string ) => void
    setRepeatPassword: ( value: string ) => void
}



export interface IForm {
    name: string
    explanation: string
    email: string
    q1: string
    q2: string
    q3: string
    q4: string
    q5: string
    phone: number
    
}