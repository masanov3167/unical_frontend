import { ReactElement, useState } from "react";
import { IProduct } from "../../types/product";

import "./styles.css"
import { DeleteIcon, EditIcon } from "../icons/crud";
import { deleter } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteProduct, updateProduct } from "../../store/reducers/products";
import Form from "../reusable/form";
import Image from "../reusable/image";
const ProductCard = ({ id, title, description, price, brand, category, thumbnail, rating }: IProduct): ReactElement => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false)
    const onDelete = async () => {
        setLoading(true)
        const result = await deleter(`products/${id}`, nav);
        setLoading(false)
        if (result.ok && result.data) {
            dispatch(deleteProduct(id));
        } else {
            Swal.fire("Error", result.msg)
        }
    }

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";
    };

    return (
        <div className="reusable__card">
            <div className="reusable__card__top">
                <button disabled={loading} onClick={() => setEdit(!edit)} style={{ width: 20, height: 20, opacity: loading ? 0.8 : 1 }}>
                    <EditIcon />
                </button>
                <button disabled={loading || edit} onClick={onDelete} style={{ width: 20, height: 20, opacity: loading ? 0.8 : 1 }}>
                    <DeleteIcon />
                </button>
            </div>
            <Image src={thumbnail} alt={description} width={100} height={100} />

            {
                edit ? (
                    <Form
                        name="products"
                        isEditForm={{
                            value: { title, description, price, rating, brand, category, thumbnail }, id, updateValue: updateProduct, edit, setEdit, loading, setLoading
                        }}
                        className="product__edit__form"
                        inputs={[
                            { name: "title", validate: { required: true, minLength: 3 } },
                            { name: "brand", validate: { minLength: 5, required: true } },
                            { name: "category", validate: { minLength: 5, required: true } },
                            { name: "rating", validate: { minLength: 1, required: true, validate: (v) => { return !isNaN(Number(v)) || "only number" } } },
                            { name: "price", validate: { minLength: 1, required: true, validate: (v) => { return !isNaN(Number(v)) || "only number" } } },
                            { name: "description", validate: { minLength: 5, required: true } },
                        ]}
                    />
                ) : (
                    <ol>
                        <li>title: <span>{title}</span></li>
                        <li>brand: <span>{brand}</span></li>
                        <li>category: <span>{category}</span></li>
                        <li>rating: <span>{rating}</span></li>
                        <li>price: <span>{price}</span></li>
                        <li>description: <span>{description}</span></li>
                        <li>
                            <span >
                                <a href={`/products/${id}`}>Go more</a>
                            </span>
                        </li>
                    </ol>
                )
            }
        </div>
    )
}
export default ProductCard