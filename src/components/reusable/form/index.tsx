import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import Input from "../input";
import { poster, putter } from "../../../utils/api";
import ActionButton from "../actionButton";


import { IEditUser } from "../../../types/hookForm";
import { IEditProduct } from "../../../types/product";
import { IAddPost, IEditPost } from "../../../types/posts";
import { IAddTodo, IEditTodo } from "../../../types/todo";

import "./styles.css";

type FormInputValidate = {
    required: boolean,
    minLength?: number,
    validate?: (value: string) => true | string;
}

type FormInput = {
    name: string,
    className?: string,
    disableLabel?: boolean,
    validate: FormInputValidate,
    type?: "checkbox" | "text"
}

type FieldsType = IEditUser | IEditProduct | IEditPost | IAddPost | IAddTodo | IEditTodo

type isEditForm = {
    id: number,
    updateValue: ActionCreatorWithPayload<any, any>,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    value: FieldsType
}

type isAddForm = {
    updateValue: ActionCreatorWithPayload<any, any>,
    add: boolean,
    setAdd: Dispatch<SetStateAction<boolean>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    value?: FieldsType
}
type Props = {
    name: "users" | "products" | "posts" | "todos",
    className: string,
    inputs: FormInput[],
    isEditForm?: isEditForm,
    isAddForm?: isAddForm,
    inputSize?: "large" | "small"
}

const Form = ({ name, className, inputs, isEditForm, isAddForm, inputSize }: Props): ReactElement => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FieldsType>({ defaultValues: isEditForm?.value ?? isAddForm?.value });

    useEffect(() => {
        if (!isEditForm?.edit) reset();
        if (!isAddForm?.add) reset();
    }, [isEditForm, isAddForm, reset])

    const onSubmit = async (data: FieldsType) => {
        console.log(data);

        if (isEditForm) {
            const { setLoading, id, updateValue, setEdit } = isEditForm;
            setLoading(true)
            const result = await putter<any, FieldsType>(`${name}/${id}`, { data: { ...data }, json: true }, nav);
            setLoading(false)
            if (result.ok && result.data) {
                dispatch(updateValue(result.data));
                setEdit(false);
                reset();
            } else {
                Swal.fire("Error", result.msg)
            }
        }
        if (isAddForm) {
            const { setLoading, updateValue, setAdd } = isAddForm;
            setLoading(true)
            const result = await poster<any, FieldsType>(`${name}/add`, { data: { ...data }, json: true }, nav);
            setLoading(false)
            if (result.ok && result.data) {
                dispatch(updateValue(result.data));
                setAdd(false);
                reset();
            } else {
                Swal.fire("Error", result.msg)
            }
        }
    }

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            {
                inputs.map((i, ind) => {
                    const obj = errors[`${i.name}` as keyof FieldsType]
                    return <Input
                        key={ind}
                        register={register}
                        error={obj}
                        name={i.name as keyof FieldsType}
                        required={i.validate.required}
                        minLength={i.validate.minLength ?? 3}
                        validate={i.validate.validate}
                        size={inputSize ?? "small"}
                        disableLabel={inputSize !== "large" || i.type === "checkbox"}
                        type={i.type}
                        className={i.className}
                    />
                })
            }
            <div className="reusable__form__button">
                <ActionButton disabled={isEditForm?.loading} text="submit" />
            </div>
        </form>
    )
}
export default Form