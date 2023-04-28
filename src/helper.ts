
interface Props { 
    id: string; 
    productName: string; 
    description: string; 
    unitPrice: number; 
    imageUrl: string; 
    category: string;
}
const getUniqueCategory = (data:Props | any)  => {
    const unique = [...new Set(data.map((item:any) => item.category))]
    return unique
}


export {getUniqueCategory}
export type {Props as DataProps}