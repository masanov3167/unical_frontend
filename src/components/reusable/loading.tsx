import { ReactElement } from "react";
import Image from "./image";

import "./styles.css";
const Loading = (): ReactElement => {
    return (
        <div className="loading">
            <Image src="https://i.pinimg.com/originals/07/bf/6f/07bf6f0f7d5dd64829822e95e97f908d.gif" alt="loading" width={500} height={500} />
        </div>
    )
}

export default Loading