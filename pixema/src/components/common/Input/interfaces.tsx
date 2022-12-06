import {FormEventHandler, MouseEventHandler} from "react";

export enum InputVariants {
    primary = "primary",
    forSearch = "forSearch",
    forNumbersSort = "forNumbersSort",
    forNumbersSortSecond = "forNumbersSortSecond"
}

export interface InputError {
    text: string | null
    error: boolean
}

export interface InputProps {
    id: string
    value: string | number
    title?: string
    onClick?: MouseEventHandler
    onSubmit?: FormEventHandler
    disabled?: boolean
    placeholder?: string
    type?: string
    name?: string
    onChange?: any
    error?: InputError
    required?: boolean
    filter?: boolean
    variant?: InputVariants
    className?: string
}
