import { ReactElement } from "react";
import "./styles.css"
import { useNavigate } from "react-router-dom";
import { NotFoundIcon } from "../icons/display";
const NotFound = (): ReactElement => {
    const navigate = useNavigate();
    return (
        <div className='not__found'>
            <div className='not__found__card'>
                <NotFoundIcon />
                <h1>404 – page not found</h1>
                <button onClick={() => navigate("/")}>Go home</button>
            </div>
        </div>
    )
}

export default NotFound