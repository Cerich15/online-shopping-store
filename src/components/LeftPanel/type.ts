type MyFunctionType = React.MouseEventHandler<HTMLButtonElement> | any;
type Props = {
    categories: string[] | unknown;
    selected: (arg:string) => void;
}

export type {Props, MyFunctionType}