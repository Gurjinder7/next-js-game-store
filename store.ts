import { create } from "zustand"
import {IProduct} from "@/utils/interface/product";
import {IState} from "@/utils/interface/State";

const useAppStore = create((set) => ({
    products:[],
    authenticated: false,
    user: null,
    loginDialog: false,
    setAuthenticated: (status: boolean) => set((state:IState) => ({authenticated: status})),
    addProduct: (product: IProduct) => {
        console.log(product);

        set((state:IState) => ({products: [...state.products, product]}));

    },
    removeProduct: (product: IProduct) => {
        set((state:IState) => ({products: state.products.filter((i) => i.id !== product.id)}));
    },
    toggleLoginDialog: (status:boolean) => set((state:IState) => ({loginDialog: status})),
    setUser: (user) => set((state:IState) => ({user: user})),
    clearData: () => set((state:IState) => ({user: null, products: [], authenticated: false})),


}));

export default useAppStore;