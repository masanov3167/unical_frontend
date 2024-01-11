import { Dispatch, ReactElement, SetStateAction } from "react";
import ActionButton from "../actionButton";

import "./styles.css";

type Props = {
    loading: boolean,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    currentPage: number,
    limit: number,
    totalUsers: number
}

const Pagination = ({ loading, setCurrentPage, currentPage, limit, totalUsers }: Props): ReactElement => {
    return (
        <div className="pagination">
            <div className="pagination__button">
                <ActionButton text="prev" disabled={loading} onClick={() => setCurrentPage((c) => (c - 1) * limit < 0 ? c : c - 1)} />
            </div>
            <div>
                <h4 className="pagination__button">{currentPage}</h4>
            </div>
            <div className="pagination__button">
                <ActionButton text="next" disabled={loading} onClick={() => setCurrentPage((c) => (c + 1) * limit > totalUsers ? c : c + 1)} />
            </div>
        </div>
    )
}

export default Pagination