import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import { useGet } from "../../utils/api";
import { IProduct } from "../../types/product";
import NotFound from "../notfound";
import Image from "../reusable/image";
import Loading from "../reusable/loading";

import "./styles.css";

const SingleProduct = (): ReactElement => {
    const { id } = useParams();
    const regex = /^[0-9]+$/;
    const enabled = id ? regex.test(id) : false;
    const { error, data: product, isLoading } = useGet<IProduct>(`products/${id}`, enabled);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error?.message ?? "Failed"}</div>
    }

    if (!isLoading && !product) {
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