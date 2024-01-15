import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../reusable/input";
import { poster } from "../../utils/api";
import { setCookie } from "../../utils/functions";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/reducers/users";
import { variables } from "../../utils/variables";

import { IAuth } from "../../types/hookForm";
import { IUser } from "../../types/user";

import "./styles.css"

const LoginComponent = (): ReactElement => {
    const [errorText, setErrorText] = useState<string>("");
    const dispatch = useDispatch();
    const nav = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAuth>();

    const onSubmit = async (e: IAuth) => {
        const result = await poster<IUser, IAuth>("auth/login", { data: e, json: true });
        if (result.ok && result.data) {
            setCookie("token", result.data.token, variables.tokenExpireMinute);
            dispatch(loginAction(result.data));
            nav("/");
        }
        return setErrorText(result.msg);
    }

    return (
        <div className="login">
            <div className="login__card">
                <h2 className="login__card__title">Login</h2>
                <form className="login__card__form" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        register={register}
                        error={errors.username}
                        required={true}
                        minLength={5}
                        name="username"
                    />

                    <Input
                        register={register}
                        error={errors.password}
                        required={true}
                        minLength={5}
                        name="password"
                    />
                    {
                        errorText && errorText.length > 0 && <p style={{ color: "red", textAlign: "center" }}>{errorText}</p>
                    }
                    <button className="login__card__button" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent