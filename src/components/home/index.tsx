import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { RootState } from "../../store/reducers";
import { useNavigate } from "react-router-dom";
import { getter, poster } from "../../utils/api";
import { addUser, getAll } from "../../store/reducers/users";
import ActionButton from "../reusable/actionButton";
import UserView from "./userView";
import Pagination from "../reusable/pagination";
import FormUser from "../reusable/formuser";

import "./styles.css"

import { EditUser } from "../../types/hookForm";

const HomeComponent = (): ReactElement => {
    const nav = useNavigate();
    const { users, totalUsers } = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(false);
    const limit = 15;
    const skip = 15;
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getter(`users?limit=${limit}&skip=${currentPage * skip}`, nav);
            if (result.ok && result.data) {
                dispatch(getAll({ users: result.data.users, total: result.data.total }));
            }
            setLoading(false);
        })()
    }, [currentPage, dispatch, nav]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditUser>();

    const onSubmit = async (data: EditUser) => {
        setLoading(true)
        const result = await poster("users/add", { data: { ...data, image: "https://robohash.org/Terry.png?set=set4" }, json: true }, nav);
        setLoading(false)
        if (result.ok && result.data) {
            dispatch(addUser(result.data));
            setAdd(false);
            reset();
        } else {
            Swal.fire("Error", result.msg)
        }
    }
    useEffect(() => {
        if (!add) reset()
    }, [add, reset])
    return (
        <div>
            <div className="flex-row">
                <h3>All users: {totalUsers}</h3>
                <ActionButton text={add ? "Close form" : "Add user"} onClick={() => setAdd((a) => loading ? a : !a)} />
            </div>
            {
                add && <div>
                    <FormUser
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        errors={errors}
                        loading={loading}
                        className="add__user__form"
                    />
                </div>
            }
            <div className="users">
                {
                    users.map((u, index) => (
                        <UserView
                            key={index}
                            firstName={u.firstName}
                            lastName={u.lastName}
                            username={u.username}
                            email={u.email}
                            gender={u.gender}
                            image={u.image}
                            id={u.id}
                        />
                    ))
                }
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={totalUsers}
                limit={limit}
                loading={loading}
            />
        </div>
    )
}

export default HomeComponent