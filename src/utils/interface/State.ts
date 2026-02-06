import {IProduct} from "@/utils/interface/product";

export type GameStoreState = {
    products: IProduct[];
    authenticated: boolean;
    user:null;
    loginDialog: boolean;
    setAuthenticated: (b: boolean) => void;
    addProduct: (product: IProduct) => void;
    removeProduct: (product: IProduct) => void;
    toggleLoginDialog: (status:boolean) => void;
    setUser: (user: any) => void;
    clearData: () => void;
    clearProducts: () => void;
}