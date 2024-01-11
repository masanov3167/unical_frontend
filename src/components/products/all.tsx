import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { variables } from "../../utils/variables";
import { getter } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { addProduct, setAll } from "../../store/reducers/products";
import Pagination from "../reusable/pagination";
import ProductCard from "./card";
import Form from "../reusable/form";
import PagesHero from "../reusable/pagesHero";

import { RootState } from "../../store/reducers";
import { productsByLimit } from "../../types/api";

import "./styles.css";
const AllProducts = (): ReactElement => {
    const { total, products } = useSelector((state: RootState) => state.productSlice);
    const { pageLimit, skipLimit } = variables;
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [add, setAdd] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getter(`products?limit=${pageLimit}&skip=${currentPage * skipLimit}`, nav);
            if (result.ok && result.data) {
                const productsData = result.data as productsByLimit
                dispatch(setAll({ products: productsData.products, total: productsData.total }));
            }
            setLoading(false);
        })()
    }, [currentPage, dispatch, nav]);
    return (
        <div>
            <PagesHero
                title={`All products: ${total}`}
                add={add}
                setAdd={setAdd}
                loading={loading}
            />
            {
                add && <div>
                    <Form
                        name="products"
                        isAddForm={{ updateValue: addProduct, add, setAdd, loading, setLoading }}
                        className="w-100 reusable__form__large"
                        inputs={[
                            { name: "title", validate: { required: true, minLength: 3 } },
                            { name: "brand", validate: { minLength: 5, required: true } },
                            { name: "category", validate: { minLength: 5, required: true } },
                            { name: "rating", validate: { minLength: 1, required: true, validate: (v) => { return !isNaN(Number(v)) || "only number" } } },
                            { name: "price", validate: { minLength: 1, required: true, validate: (v) => { return !isNaN(Number(v)) || "only number" } } },
                            { name: "description", validate: { minLength: 5, required: true } },
                        ]}
                        inputSize="large"
                    />
                </div>
            }
            <div className="products">
                {
                    products.map((p, index) => (
                        <ProductCard key={index} {...p} />

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
export default AllProducts