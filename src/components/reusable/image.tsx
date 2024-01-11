import { ReactElement } from "react"

type Props = {
    src: string,
    alt?: string,
    width: number,
    height: number
}

const Image = ({ src, alt, width, height }: Props): ReactElement => {
    const path = "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = path;
    };
    return (
        <img src={src ?? path} alt={alt ?? "image"} width={width} height={height}
            onError={handleImageError}
        />
    )
}

export default Image