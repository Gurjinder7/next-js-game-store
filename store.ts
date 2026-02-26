import { create } from 'zustand';
import { IProduct } from '@/utils/interface/product';
import { GameStoreState } from '@/utils/interface/State';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAppStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      products: [],
      authenticated: false,
      user: null,
      sidebar: false,
      loginDialog: false,
      setAuthenticated: (status: boolean) =>
        set((state: GameStoreState) => ({ authenticated: status })),
      addProduct: (product: IProduct) => {
        console.log(product);

        set((state: GameStoreState) => ({
          products: [...state.products, product],
        }));
      },
      removeProduct: (product: IProduct) => {
        set((state: GameStoreState) => ({
          products: state.products.filter((i) => i.id !== product.id),
        }));
      },
      toggleLoginDialog: (status: boolean) =>
        set((state: GameStoreState) => ({ loginDialog: status })),
      setUser: (user) => set((state: GameStoreState) => ({ user: user })),
      clearData: () =>
        set((state: GameStoreState) => ({
          user: null,
          products: [],
          authenticated: false,
          loginDialog: false,
        })),
      clearProducts: () => set((state: GameStoreState) => ({ products: [] })),
      toggleSidebar: (status: boolean) =>
        set((state: GameStoreState) => ({ sidebar: status })),
    }),
    {
      name: 'game-store-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

// Store without persistence...
// const useAppStore = create((set) => ({
//     products:[],
//     authenticated: false,
//     user: null,
//     loginDialog: false,
//     setAuthenticated: (status: boolean) => set((state:IState) => ({authenticated: status})),
//     addProduct: (product: IProduct) => {
//         console.log(product);
//
//         set((state:IState) => ({products: [...state.products, product]}));
//
//     },
//     removeProduct: (product: IProduct) => {
//         set((state:IState) => ({products: state.products.filter((i) => i.id !== product.id)}));
//     },
//     toggleLoginDialog: (status:boolean) => set((state:IState) => ({loginDialog: status})),
//     setUser: (user) => set((state:IState) => ({user: user})),
//     clearData: () => set((state:IState) => ({user: null, products: [], authenticated: false})),
//
//
// }));

export default useAppStore;
