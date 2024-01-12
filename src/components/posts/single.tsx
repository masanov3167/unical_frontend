import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../notfound";
import { useGet } from "../../utils/api";
import Loading from "../reusable/loading";

import { IPost } from "../../types/posts";

import "./styles.css";
const SinglePost = (): ReactElement => {
    const { id } = useParams();
    const regex = /^[0-9]+$/;
    const enabled = id ? regex.test(id) : false;
    const { error, data: post, isLoading } = useGet<IPost>(`posts/${id}`, enabled);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error?.message ?? "Failed"}</div>
    }

    if (!isLoading && !post) {
        return <NotFound />
    }


    return (
        <div>
            {
                post && (
                    <ol >
                        <li style={{ display: "flex" }}><h4>Title  </h4> <span>: {post.title}</span></li>
                        <li style={{ display: "flex" }}><h4>Body</h4> <span>: {post.body}</span></li>
                        <li style={{ display: "flex" }}><h4>Tags </h4>  <span>: {typeof post.tags === "string" ? `#${String(post.tags).split(",").join(" #")}` : `#${post.tags.join(" #")}`}</span></li>
                    </ol>
                )
            }

        </div>
    )
}
export default SinglePost