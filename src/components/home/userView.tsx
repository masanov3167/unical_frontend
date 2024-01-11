import { ReactElement, useState } from "react";
import Swal from "sweetalert2"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteUser, updateUser } from "../../store/reducers/users";
import { deleter } from "../../utils/api";
import { userType } from "../../types/user";
import { Gender } from "../../types/hookForm";
import Form from "../reusable/form";
import Image from "../reusable/image";
import CardsHero from "../reusable/cardsHero";

import "./styles.css";

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

    return (
        <div className="reusable__card">
            <CardsHero loading={loading} edit={edit} setEdit={setEdit} onDelete={onDelete} />
            <Image src={user.image} alt={user.firstName} width={100} height={100} />
            {
                edit ? (
                    <Form
                        name="users"
                        isEditForm={{ value: user, id: user.id, updateValue: updateUser, edit, setEdit, loading, setLoading }}
                        className="w-100"
                        inputs={[
                            { name: "firstName", validate: { required: true, minLength: 4 } },
                            { name: "lastName", validate: { required: true, minLength: 4 } },
                            { name: "username", validate: { required: true, minLength: 4 } },
                            { name: "email", validate: { required: true, minLength: 4 } },
                            { name: "gender", validate: { required: true, minLength: 4, validate: (value) => Object.values(Gender).includes(value as Gender) || 'Invalid gender' } },
                        ]}
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