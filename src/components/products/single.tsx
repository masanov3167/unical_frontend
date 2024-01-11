import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../store/reducers";
import { setProduct } from "../../store/reducers/products";
import { getter } from "../../utils/api";
import { IProduct } from "../../types/product";
import NotFound from "../notfound";
import Image from "../reusable/image";

import "./styles.css";

const SingleProduct = (): ReactElement => {
    const { product } = useSelector((state: RootState) => state.productSlice);
    const dispatch = useDispatch();
    const { id } = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const regex = /^[0-9]+$/;
            if (id && regex.test(id)) {
                setLoading(true)
                const result = await getter(`products/${id}`, nav);
                setLoading(false)
                if (result.ok && result.data) {
                    dispatch(setProduct(result.data as IProduct))
                }
            }
        })()
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (!loading && !product) {
        return <NotFound />
    }


    return (
        <div>
            {
                product && (
                    <div>
                        <ol style={{ listStyle: "none" }}>
                            <li style={{ display: "flex" }}><h4>Title : </h4> <span> {product.title}</span></li>
                            <li style={{ display: "flex" }}><h4>Brand :</h4> <span>{product.brand}</span></li>
                            <li style={{ display: "flex" }}><h4>Ratin :</h4>  <span>{product.rating}</span></li>
                            <li style={{ display: "flex" }}><h4>Price :</h4>  <span>{product.price}</span></li>
                            <li style={{ display: "flex" }}><h4>Description :</h4>  <span>{product.description}</span></li>
                        </ol>
                        <ol className="product__single__images">
                            {
                                product.images.map((i, ind) => (
                                    <li key={ind}>
                                        <Image
                                            src={i}
                                            alt={product.description}
                                            width={200}
                                            height={200}
                                        />
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                )
            }
        </div>
    )
}
export default SingleProduct