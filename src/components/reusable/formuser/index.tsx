import { ReactElement } from "react"
import { EditUser, Gender } from "../../../types/hookForm"
import Input from "../input"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import ActionButton from "../actionButton"

import "./styles.css";

type Props = {
    className?: string,
    onSubmit: () => void,
    register: UseFormRegister<EditUser>,
    errors: FieldErrors<EditUser>,
    loading: boolean,
    isEditForm?: boolean
}

const FormUser = ({ className, onSubmit, register, errors, loading, isEditForm }: Props): ReactElement => {
    return (
        <form onSubmit={onSubmit} style={{ width: "100%" }} className={className}>
            <Input
                register={register}
                error={errors.firstName}
                required={true}
                minLength={5}
                name="firstName"
                className={isEditForm ? "users__card__input" : undefined}
                disableLabel={isEditForm}
            />
            <Input
                register={register}
                error={errors.lastName}
                required={true}
                minLength={5}
                name="lastName"
                className={isEditForm ? "users__card__input" : undefined}
                disableLabel={isEditForm}
            />
            <Input
                register={register}
                error={errors.username}
                required={true}
                minLength={5}
                name="username"
                className={isEditForm ? "users__card__input" : undefined}
                disableLabel={isEditForm}
            />
            <Input
                register={register}
                error={errors.email}
                required={true}
                minLength={5}
                name="email"
                className={isEditForm ? "users__card__input" : undefined}
                disableLabel={isEditForm}
            />
            <Input
                register={register}
                error={errors.gender}
                required={true}
                minLength={4}
                name="gender"
                className={isEditForm ? "users__card__input" : undefined}
                disableLabel={isEditForm}
                validate={(value) => Object.values(Gender).includes(value as Gender) || 'Invalid gender'}
            />
            <div className="users__card__button">
                <ActionButton disabled={loading} text="submit" />
            </div>
        </form>
    )
}

export default FormUser