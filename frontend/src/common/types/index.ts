import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form"

export interface IPropsLogin<
TFieldValues extends FieldValues = FieldValues,
TContext = any,
> {
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
}

export interface IPropsRegister<
TFieldValues extends FieldValues = FieldValues,
TContext = any,
> {
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
}

export interface IForm {
    q1: string
    q2: string
    q3: string
    q4: string
    name: string
    explanation: string
    email: string
    phone: string
    q5: string
  }