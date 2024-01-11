import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { variables } from "../../utils/variables";
import { getter } from "../../utils/api";
import Pagination from "../reusable/pagination";
import Form from "../reusable/form";
import PagesHero from "../reusable/pagesHero";
import { addTodo, setAll } from "../../store/reducers/todos";
import TodoCard from "./card";

import { RootState } from "../../store/reducers";
import { todosByLimit } from "../../types/api";

import "./styles.css"
const AllTodos = (): ReactElement => {
    const { total, todos } = useSelector((state: RootState) => state.todoSlice);
    const { user } = useSelector((state: RootState) => state.userSlice);
    const { pageLimit, skipLimit } = variables;
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getter(`todos?limit=${pageLimit}&skip=${currentPage * skipLimit}`, nav);
            if (result.ok && result.data) {
                const postsData = result.data as todosByLimit
                dispatch(setAll({ todos: postsData.todos, total: postsData.total }));
            }
            setLoading(false);
        })()
    }, [currentPage, dispatch, nav]);
    return (
        <div>
            <PagesHero
                title={`All todos: ${total}`}
                add={add}
                setAdd={setAdd}
                loading={loading}
            />
            {
                add && <div>
                    <Form
                        name="todos"
                        isAddForm={{ updateValue: addTodo, add, setAdd, loading, setLoading, value: { userId: user?.id ?? 1, todo: "", completed: false } }}
                        className="w-100 reusable__form__large"
                        inputs={[
                            { name: "todo", validate: { required: true, minLength: 3 } },
                        ]}
                        inputSize="large"

                    />
                </div>
            }
            <div className="todos">
                {
                    todos.map((t, index) => (
                        <TodoCard key={index} {...t} />
                    ))
                }
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={total}
                limit={pageLimit}
                loading={loading}
            />
        </div>
    )
}
export default AllTodos