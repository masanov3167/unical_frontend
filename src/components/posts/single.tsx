import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import NotFound from "../notfound";
import { getter } from "../../utils/api";
import { setPost } from "../../store/reducers/posts";

import { RootState } from "../../store/reducers";
import { IPost } from "../../types/posts";

import "./styles.css";
const SinglePost = (): ReactElement => {
    const { post } = useSelector((state: RootState) => state.postSlice);
    const dispatch = useDispatch();
    const { id } = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const regex = /^[0-9]+$/;
            if (id && regex.test(id)) {
                setLoading(true)
                const result = await getter(`posts/${id}`, nav);
                setLoading(false)
                if (result.ok && result.data) {
                    dispatch(setPost(result.data as IPost))
                }
            }
        })()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (!loading && !post) {
        return <NotFound />
    }


    return (
        <div>
            {
                post && (
                    <div>
                        <ol style={{ listStyle: "none" }}>
                            <li style={{ display: "flex" }}><h4>Title  </h4> <span>: {post.title}</span></li>
                            <li style={{ display: "flex" }}><h4>Body</h4> <span>: {post.body}</span></li>
                            <li style={{ display: "flex" }}><h4>Tags </h4>  <span>: {typeof post.tags === "string" ? `#${String(post.tags).split(",").join(" #")}` : `#${post.tags.join(" #")}`}</span></li>
                        </ol>

                    </div>
                )
            }
        </div>
    )
}
export default SinglePost