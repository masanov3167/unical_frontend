import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeCookie } from "../../utils/functions";

import { IRootState } from "../../store/reducers";

import "./header.css"

const Header = (): ReactElement => {
    const { user } = useSelector((state: IRootState) => state.userSlice);
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === "/login";
    const navigate = useNavigate();

    const onLogOut = () => {
        removeCookie("token");
        navigate("/login");
    }
    return (
        <>
            {
                isLoginPage ? (
                    <></>
                ) : (
                    <header className="header flex-row">
                        <a className="header__logo" href="/">
                            {user ? user.firstName : "Unical"}
                        </a>
                        <ol className="flex-row header__nav">
                            <li className="header__nav__items"> <a href="/products">Products</a> </li>
                            <li className="header__nav__items"> <a href="/todos">Todos</a> </li>
                            <li className="header__nav__items"> <a href="/posts">Posts</a> </li>
                            <li className="header__nav__items"><button onClick={onLogOut}>Log out</button></li>
                        </ol>
                    </header>
                )
            }
        </>
    )
}

export default Header