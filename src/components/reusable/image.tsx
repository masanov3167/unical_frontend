import { ReactElement } from "react"

type Props = {
    src: string,
    alt?: string,
    width: number,
    height: number
}

const Image = ({ src, alt, width, height }: Props): ReactElement => {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";
    };
    return (
        <img src={src ?? "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"} alt={alt ?? "image"} width={width} height={height}
            onError={handleImageError}
        />
    )
}

export default Image