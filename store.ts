import { create } from "zustand"
import {IProduct} from "@/utils/interface/product";
import {IState} from "@/utils/interface/State";

const useAppStore = create((set) => ({
    products:[],
    authenticated: false,
    setAuthenticated: (status: boolean) => set((state:IState) => ({authenticated: status})),
    addProduct: (product: IProduct) => {
        console.log(product);
        set((state:IState) => ({products: [...state.products, product]}));

    },
    removeProduct: (product: IProduct) => ({
        set(state:IState) {
            state.products = state.products.filter(product => product.id !== product.id)
        }
    })

}));

export default useAppStore;