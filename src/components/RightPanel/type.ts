import { DataProps } from "../../helper"
type MyFunctionType = React.MouseEventHandler<HTMLButtonElement> | any;
type Props = {
    items: DataProps[];
    setItems: (prev: DataProps[]) => void;
    isModalOpen: (arg:Boolean) => void;

}

export type {Props, MyFunctionType}