import { ReactElement } from "react";
import "./styles.css";

type Props = {
    disabled?: boolean,
    text: string,
    onClick?: () => void
}
const ActionButton = ({ disabled, text, onClick }: Props): ReactElement => {
    return (
        <button className="action__button" style={{ cursor: disabled ? "progress" : "pointer" }} disabled={disabled} onClick={onClick}>{text}</button>
    )
}

export default ActionButton