import { FieldError, useFormContext } from "react-hook-form"

import { Option } from "@/src/lib/types"

export const FormSelect = ({
    options,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, name: string, options: Option[] }) => {

    const { register, formState: { errors } } = useFormContext()
    const error = errors[props.name] as FieldError

    return (
        <div className="space-y-1 w-full">
            <label htmlFor={props.id} className="block text-sm/6 font-bold text-gray-900">{props.label}</label>
            <select id={props.id} {...register(props.name)} name={props.name} required={props.required} className={`block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${props.className}`}>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}