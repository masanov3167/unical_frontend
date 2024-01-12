import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/reducers";
import { useNavigate } from "react-router-dom";
import { getter } from "../../utils/api";
import { addUser, setAll } from "../../store/reducers/users";
import UserView from "./userView";
import Pagination from "../reusable/pagination";
import { variables } from "../../utils/variables";
import { usersByLimit } from "../../types/api";
import Form from "../reusable/form";
import { Gender } from "../../types/hookForm";
import PagesHero from "../reusable/pagesHero";
import Loading from "../reusable/loading";

import "./styles.css"

const HomeComponent = (): ReactElement => {
    const nav = useNavigate();
    const { users, totalUsers } = useSelector((state: RootState) => state.userSlice);
    const { pageLimit, skipLimit } = variables
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [visibleLoader, setVisibleLoader] = useState<boolean>(true)
    const [add, setAdd] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getter(`users?limit=${pageLimit}&skip=${currentPage * skipLimit}`, nav);
            if (result.ok && result.data) {
                const usersData = result.data as usersByLimit;
                dispatch(setAll({ users: usersData.users, total: usersData.total }));
            }
            setLoading(false);
            setVisibleLoader(false)
        })();
    }, [currentPage, dispatch, nav]);

    if (visibleLoader) {
        return <Loading />
    }

    return (
        <div>
            <PagesHero title={`All users: ${totalUsers}`} add={add} setAdd={setAdd} loading={loading} />
            {
                add && <div>
                    <Form
                        name="users"
                        isAddForm={{ updateValue: addUser, add, setAdd, loading, setLoading }}
                        className="w-100 reusable__form__large"
                        inputs={[
                            { name: "firstName", validate: { required: true, minLength: 4 } },
                            { name: "lastName", validate: { required: true, minLength: 4 } },
                            { name: "username", validate: { required: true, minLength: 4 } },
                            { name: "email", validate: { required: true, minLength: 4 } },
                            { name: "gender", validate: { required: true, minLength: 4, validate: (value) => Object.values(Gender).includes(value as Gender) || 'Invalid gender' } },
                        ]}
                        inputSize="large"
                    />
                </div>
            }
            <div className="users">
                {
                    users.map((u, index) => (
                        <UserView key={index} {...u} />
                    ))
                }
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={totalUsers}
                limit={pageLimit}
                loading={loading}
            />
        </div>
    )
}

export default HomeComponent