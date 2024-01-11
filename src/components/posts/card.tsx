import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { deleter } from "../../utils/api";
import Form from "../reusable/form";
import { deletePost, updatePost } from "../../store/reducers/posts";
import CardsHero from "../reusable/cardsHero";

import { IPost } from "../../types/posts";

import "./styles.css"

const PostCard = ({ id, title, body, tags }: IPost): ReactElement => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false)
    const onDelete = async () => {
        setLoading(true)
        const result = await deleter(`posts/${id}`, nav);
        setLoading(false)
        if (result.ok && result.data) {
            dispatch(deletePost(id));
        } else {
            Swal.fire("Error", result.msg)
        }
    }

    return (
        <div className="reusable__card">
            <CardsHero loading={loading} edit={edit} setEdit={setEdit} onDelete={onDelete} />
            <br />
            {
                edit ? (
                    <Form
                        name="posts"
                        isEditForm={{
                            value: { title, body, tags }, id, updateValue: updatePost, edit, setEdit, loading, setLoading
                        }}
                        className="product__edit__form"
                        inputs={[
                            { name: "title", validate: { required: true, minLength: 3 } },
                            { name: "body", validate: { minLength: 5, required: true } },
                            { name: "tags", validate: { minLength: 3, required: true } },
                        ]}
                    />
                ) : (
                    <ol>
                        <li>title: <span>{title}</span></li>
                        <li>body: <span>{body}</span></li>
                        <li>tags: <span>{typeof tags === "string" ? `#${String(tags).split(",").join(" #")}` : `#${tags.join(" #")}`}</span></li>
                        <li>
                            <span >
                                <a href={`/posts/${id}`}>Go more</a>
                            </span>
                        </li>
                    </ol>
                )
            }
        </div>
    )
}
export default PostCard