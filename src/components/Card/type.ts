import { DataProps } from "../../helper"

type MyFunctionType = React.MouseEventHandler<HTMLButtonElement> | any;
type Props = {
    datas: DataProps[];
    content: (arg:DataProps) => void;
}

export type {Props, MyFunctionType}