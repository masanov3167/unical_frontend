import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

import "./header.css"
const Header = (): ReactElement => {
    const { user } = useSelector((state: RootState) => state.userSlice);
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === "/login";
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
                        </ol>
                    </header>
                )
            }
        </>
    )
}

export default Header