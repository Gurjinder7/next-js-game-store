import {IProduct} from "@/utils/interface/product";
import {UserInfo} from "@/utils/interface/types";

export type GameStoreState = {
    products: IProduct[];
    authenticated: boolean;
    user:UserInfo | null;
    loginDialog: boolean;
    setAuthenticated: (b: boolean) => void;
    addProduct: (product: IProduct) => void;
    removeProduct: (product: IProduct) => void;
    toggleLoginDialog: (status:boolean) => void;
    setUser: (user: any) => void;
    clearData: () => void;
    clearProducts: () => void;
}