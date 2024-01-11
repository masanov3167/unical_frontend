import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../icons";

import "./styles.css";
const NotFound = (): ReactElement => {
    const navigate = useNavigate();
    return (
        <div className='not__found'>
            <div className='not__found__card'>
                <Icon name="notfound" />
                <h1>404 – page not found</h1>
                <button onClick={() => navigate("/")}>Go home</button>
            </div>
        </div>
    )
}

export default NotFound