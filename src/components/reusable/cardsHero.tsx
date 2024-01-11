import { Dispatch, ReactElement, SetStateAction } from "react";
import Icon from "../icons";

type Props = {
    loading: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    edit: boolean,
    onDelete: () => void
}

const CardsHero = ({ loading, setEdit, edit, onDelete }: Props): ReactElement => {
    return (
        <div className="reusable__card__top">
            <button disabled={loading} onClick={() => setEdit(!edit)} style={{ width: 20, height: 20, opacity: loading ? 0.8 : 1 }}>
                <Icon name="edit" />
            </button>
            <button disabled={loading || edit} onClick={onDelete} style={{ width: 20, height: 20, opacity: loading ? 0.8 : 1 }}>
                <Icon name="delete" />
            </button>
        </div>
    )
}

export default CardsHero