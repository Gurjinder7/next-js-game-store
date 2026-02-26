import { IProduct } from '@/utils/interface/product';
import { UserInfo } from '@/utils/interface/types';

export type GameStoreState = {
  products: IProduct[];
  authenticated: boolean;
  user: UserInfo | null;
  sidebar: boolean;
  loginDialog: boolean;
  setAuthenticated: (status: boolean) => void;
  addProduct: (product: IProduct) => void;
  removeProduct: (product: IProduct) => void;
  toggleLoginDialog: (status: boolean) => void;
  setUser: (user: UserInfo) => void;
  clearData: () => void;
  clearProducts: () => void;
  toggleSidebar: (status: boolean) => void;
};
