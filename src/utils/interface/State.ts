import {IProduct} from "@/utils/interface/product";

export interface IState {
    products: IProduct[];
    authenticated: boolean;
    setAuthenticated: (b: boolean) => void;
    addProduct: (product: IProduct) => void;
    removeProduct: (product: IProduct) => void;
}