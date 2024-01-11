import { ReactElement } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
    register: UseFormRegister<T>;
    error: any;
    required: boolean;
    minLength: number;
    name: Path<T>;
    className?: string,
    disableLabel?: boolean,
    validate?: (value: string) => true | string;
    size?: "large" | "small"
}

const Input = <T extends FieldValues>({ register, error, required, minLength, name, className, disableLabel, validate, size }: InputProps<T>): ReactElement => {
    return (
        <div className={`${className} ${size === "small" ? "small__form__input" : undefined}`} style={{ marginTop: "5px" }}>
            {
                !disableLabel && <h3 style={{ color: error ? "red" : "black" }}>Write {name}</h3>
            }
            <input
                placeholder={name}
                className="login__card__input"
                {...register(name, {
                    required: required ? "Field must be filled" : false,
                    minLength: minLength ? { value: minLength, message: `Minimum length : ${minLength}` } : undefined,
                    validate
                })}
                style={{
                    border: error ? '1px solid red' : '1px solid #ccc',
                }}
            />
            {error && (
                <p style={{ color: 'red' }}>{error.message}</p>
            )}
        </div>
    );
};

export default Input;
