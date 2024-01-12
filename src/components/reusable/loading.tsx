import { ReactElement } from "react";
import Image from "./image";

import "./styles.css";
const Loading = (): ReactElement => {
    return (
        <div className="loading">
            <Image src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="loading" width={400} height={400} />
        </div>
    )
}

export default Loading