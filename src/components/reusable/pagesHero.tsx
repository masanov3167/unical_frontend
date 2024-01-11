import { Dispatch, SetStateAction } from "react"
import ActionButton from "./actionButton"


type Props = {
    title: string,
    add: boolean,
    setAdd: Dispatch<SetStateAction<boolean>>,
    loading: boolean
}
const PagesHero = ({ title, add, setAdd, loading }: Props) => {
    return (
        <div className="flex-row">
            <h3>{title}</h3>
            <ActionButton text={add ? "Close form" : "Add item"} onClick={() => setAdd((a) => loading ? a : !a)} />
        </div>
    )
}

export default PagesHero