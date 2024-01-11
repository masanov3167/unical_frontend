import { ReactElement } from "react"
import { DeleteIcon, EditIcon } from "./crud"
import { NotFoundIcon } from "./display"

export type IconNames = "delete" | "edit" | "notfound"

export type IconProps = {
    name: IconNames
}
export type Icons = {
    name: IconNames,
    component: ReactElement
}

const icons: Icons[] = [
    { name: "delete", component: <DeleteIcon /> },
    { name: "edit", component: <EditIcon /> },
    { name: "notfound", component: <NotFoundIcon /> },
];

const Icon = ({ name }: IconProps): ReactElement => {
    const findIcon = icons.find(i => i.name === name);
    if (!findIcon) {
        return <></>
    }
    return findIcon.component
}
export default Icon