import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { deleter } from "../../utils/api";
import Form from "../reusable/form";
import { deleteTodo, updateTodo } from "../../store/reducers/todos";

import { ITodo } from "../../types/todo";

import "./styles.css"
import CardsHero from "../reusable/cardsHero";
const TodoCard = ({ id, todo, completed }: ITodo): ReactElement => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false)
    const onDelete = async () => {
        setLoading(true)
        const result = await deleter(`todos/${id}`, nav);
        setLoading(false)
        if (result.ok && result.data) {
            dispatch(deleteTodo(id));
        } else {
            Swal.fire("Error", result.msg)
        }
    }

    return (
        <div className="reusable__card">
            <CardsHero edit={edit} setEdit={setEdit} loading={loading} onDelete={onDelete} />
            <br />
            {
                edit ? (
                    <Form
                        name="todos"
                        isEditForm={{
                            value: { todo, completed }, id, updateValue: updateTodo, edit, setEdit, loading, setLoading
                        }}
                        className="product__edit__form"
                        inputs={[
                            { name: "todo", validate: { required: true, minLength: 3 } },
                            { name: "completed", validate: { required: false }, type: "checkbox", className: "checkbox__input" },
                        ]}
                    />
                ) : (
                    <ol>
                        <li>todo <span>:{todo}</span></li>
                        <li>completed <span>:{completed ? "true" : "false"}</span></li>
                        <li>
                            <span >
                                <a href={`/todos/${id}`}>Go more</a>
                            </span>
                        </li>
                    </ol>
                )
            }
        </div>
    )
}
export default TodoCard