import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../store/reducers";
import { getter } from "../../utils/api";
import NotFound from "../notfound";
import { setTodo } from "../../store/reducers/todos";

import { ITodo } from "../../types/todo";

import "./styles.css";
const SingleTodo = (): ReactElement => {
    const { todo } = useSelector((state: RootState) => state.todoSlice);
    const dispatch = useDispatch();
    const { id } = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const regex = /^[0-9]+$/;
            if (id && regex.test(id)) {
                setLoading(true)
                const result = await getter(`todos/${id}`, nav);
                setLoading(false)
                if (result.ok && result.data) {
                    dispatch(setTodo(result.data as ITodo))
                }
            }
        })()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (!loading && !todo) {
        return <NotFound />
    }


    return (
        <div>
            {
                todo && (
                    <div>
                        <ol style={{ listStyle: "none" }}>
                            <li style={{ display: "flex" }}><h4>Todo  </h4> <span>: {todo.todo}</span></li>
                            <li style={{ display: "flex" }}><h4>Completed</h4> <span>: {todo.completed ? "true" : "false"}</span></li>
                        </ol>
                    </div>
                )
            }
        </div>
    )
}
export default SingleTodo