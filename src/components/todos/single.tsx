import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { useGet } from "../../utils/api";
import NotFound from "../notfound";
import Loading from "../reusable/loading";

import { ITodo } from "../../types/todo";

import "./styles.css";
const SingleTodo = (): ReactElement => {
    const { id } = useParams();
    const regex = /^[0-9]+$/;
    const enabled = id ? regex.test(id) : false;
    const { error, data: todo, isLoading: loading } = useGet<ITodo>(`todos/${id}`, enabled);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error?.message ?? "Failed"}</div>
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