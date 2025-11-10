import { IProduct } from "../interfaces/product.interface";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async () => {
    try {
    const res = await fetch(`${APIURL}/products`, {method: 'GET'});
    const products: IProduct[] = await res.json();
    return products;}
    catch (error:any) {
        throw new Error(error);
    };
}

export const getProductById = async (id:string) => {
    try {
    const allProducts = await getAllProducts();
    const product= allProducts.find(product => product.id === Number(id));
    if (!product) {
        throw new Error('Product no encontrado');
    }
    return product;}
    catch (error:any) {
        throw new Error(error);
    };
}