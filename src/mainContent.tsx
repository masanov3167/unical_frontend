import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { getCookie } from "./utils/functions";

function MainContent(): JSX.Element {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === "/login";
    useEffect(() => {
        const token = getCookie("token");
        if (!token) {
            window.location.href = "/login"
        }
    }, [])
    return (
        <div>
            <Header />
            <main style={{ marginTop: isLoginPage ? "80px" : "80px", padding: "30px 50px" }}>
                <Outlet />
            </main >
        </div >
    );
}

export default MainContent;
