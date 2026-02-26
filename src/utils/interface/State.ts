import { IProduct } from '@/utils/interface/product';
import { UserInfo } from '@/utils/interface/types';

export type GameStoreState = {
  products: IProduct[];
  authenticated: boolean;
  user: UserObj;
  sidebar: boolean;
  loginDialog: boolean;
  setAuthenticated: (status: boolean) => void;
  addProduct: (product: IProduct) => void;
  removeProduct: (product: IProduct) => void;
  toggleLoginDialog: (status: boolean) => void;
  setUser: (user: UserObj) => void;
  clearData: () => void;
  clearProducts: () => void;
  toggleSidebar: (status: boolean) => void;
};

export type UserObj = UserInfo | null | undefined;
