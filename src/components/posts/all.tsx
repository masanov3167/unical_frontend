import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { variables } from "../../utils/variables";
import { getter } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Pagination from "../reusable/pagination";
import Form from "../reusable/form";
import PagesHero from "../reusable/pagesHero";
import { addPost, setAll } from "../../store/reducers/posts";
import PostCard from "./card";
import Loading from "../reusable/loading";

import { IPostsLimited } from "../../types/api";
import { IRootState } from "../../store/reducers";

import "./styles.css";
const AllProsts = (): ReactElement => {
    const { total, posts } = useSelector((state: IRootState) => state.postSlice);
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const { pageLimit, skipLimit } = variables;
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(false);
    const [visibleLoader, setVisibleLoader] = useState<boolean>(true)
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getter<IPostsLimited>(`posts?limit=${pageLimit}&skip=${currentPage * skipLimit}`, nav);
            if (result.ok && result.data) {
                dispatch(setAll(result.data));
            }
            setLoading(false);
            setVisibleLoader(false)
        })()
    }, [currentPage, dispatch, nav]);

    if (visibleLoader) {
        return <Loading />
    }

    return (
        <div>
            <PagesHero
                title={`All posts: ${total}`}
                add={add}
                setAdd={setAdd}
                loading={loading}
            />
            {
                add && <div>
                    <Form
                        name="posts"
                        isAddForm={{ updateValue: addPost, add, setAdd, loading, setLoading, value: { userId: user?.id ?? 1, title: "", tags: ["new", "best"], body: "" } }}
                        className="w-100 reusable__form__large"
                        inputs={[
                            { name: "title", validate: { required: true, minLength: 3 } },
                            { name: "body", validate: { minLength: 5, required: true } },
                            { name: "tags", validate: { minLength: 3, required: true } },
                        ]}
                        inputSize="large"

                    />
                </div>
            }
            <div className="posts">
                {
                    posts.map((p, index) => (
                        <PostCard
                            key={index}  {...p}
                        />
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
export default AllProsts