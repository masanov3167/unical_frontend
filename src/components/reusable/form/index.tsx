import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { poster, putter } from "../../../utils/api";
import { EditUser } from "../../../types/hookForm";
import { EditIProduct } from "../../../types/product";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import "./styles.css"
import ActionButton from "../actionButton";
type FormInputValidate = {
    required: boolean,
    minLength?: number,
    validate?: (value: string) => true | string;
}

type FormInput = {
    name: string,
    className?: string,
    disableLabel?: boolean,
    validate: FormInputValidate
}

type FieldsType = EditUser | EditIProduct

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
}
type Props = {
    name: "users" | "products",
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
    } = useForm<FieldsType>({ defaultValues: isEditForm?.value });

    useEffect(() => {
        if (!isEditForm?.edit) reset();
        if (!isAddForm?.add) reset();
    }, [isEditForm, isAddForm, reset])

    const onSubmit = async (data: FieldsType) => {
        if (isEditForm) {
            const { setLoading, id, updateValue, setEdit } = isEditForm;
            setLoading(true)
            const result = await putter(`${name}/${id}`, { data: { ...data }, json: true }, nav);
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
            const result = await poster(`${name}/add`, { data: { ...data }, json: true }, nav);
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
                        disableLabel={inputSize !== "large"}
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