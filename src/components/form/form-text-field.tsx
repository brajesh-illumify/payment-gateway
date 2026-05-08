import { FieldError, useFormContext } from "react-hook-form";

export const FormTextField = ({
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string , name: string }) => {

    const { register, formState: { errors } } = useFormContext()
    const error = errors[props.name] as FieldError

    return (
        <div className="space-y-1 w-full">
            <label htmlFor={props.id} className="block text-sm/6 font-bold text-gray-900">{props.label}</label>
            <input id={props.id} {...register(props.name)} type="text" required={props.required} autoComplete={props.autoComplete} className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${props.className}`} {...props} />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};