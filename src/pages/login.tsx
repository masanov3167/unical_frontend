import { ReactElement, useEffect } from "react";
import { getCookie } from "../utils/functions";
import LoginComponent from "../components/login";


const Login = (): ReactElement => {
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            window.location.href = "/"
        }
    }, [])
    return <LoginComponent />

}

export default Login