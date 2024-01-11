import { ReactElement, useEffect, useState } from "react";
import Swal from "sweetalert2"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


import "./styles.css";

import { DeleteIcon, EditIcon } from "../icons/crud";
import { deleteUser, updateUser } from "../../store/reducers/users";
import { deleter, putter } from "../../utils/api";
import FormUser from "../reusable/formuser";

import { userType } from "../../types/user";
import { EditUser } from "../../types/hookForm";


type UserTypeWithoutToken = Omit<userType, 'token'>;
const UserView = (user: UserTypeWithoutToken): ReactElement => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false)
    const onDelete = async () => {
        setLoading(true)
        const result = await deleter(`users/${user.id}`, nav);
        setLoading(false)
        if (result.ok && result.data) {
            dispatch(deleteUser(user.id));
        } else {
            Swal.fire("Error", result.msg)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditUser>({ defaultValues: user });

    useEffect(() => {
        if (!edit) reset()
    }, [edit, reset])

    const onSubmit = async (data: EditUser) => {
        setLoading(true)
        const result = await putter(`users/${user.id}`, { data, json: true }, nav);
        setLoading(false)
        if (result.ok && result.data) {
            dispatch(updateUser(result.data));
            setEdit(false);
            reset();
        } else {
            Swal.fire("Error", result.msg)
        }
    }
    return (
        <div className="users__card">
            <div className="users__card__top">
                <button disabled={loading} onClick={() => setEdit(!edit)} style={{ width: 20, height: 20, opacity: loading ? 0.8 : 1 }}>
                    <EditIcon />
                </button>
                <button disabled={loading || edit} onClick={onDelete} style={{ width: 20, height: 20, opacity: loading ? 0.8 : 1 }}>
                    <DeleteIcon />
                </button>
            </div>
            <img src={user.image} alt={user.firstName} width={100} height={100} />
            {
                edit ? (
                    <FormUser
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        errors={errors}
                        loading={loading}
                        isEditForm
                    />
                ) : (
                    <ol>
                        <li>firstname: <span>{user.firstName}</span></li>
                        <li>lastname: <span>{user.lastName}</span></li>
                        <li>username: <span>{user.username}</span></li>
                        <li>email: <span>{user.email}</span></li>
                        <li>gender: <span>{user.gender}</span></li>
                    </ol>
                )
            }
        </div>
    )
}
export default UserView