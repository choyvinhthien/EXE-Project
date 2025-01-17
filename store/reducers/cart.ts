import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductStoreType } from 'types';

interface CartTypes {
  cartItems: ProductStoreType[]
}

const initialState = { 
  cartItems: [] 
} as CartTypes;

const indexSameProduct = (state: CartTypes, action: ProductStoreType) => {
  const sameProduct = (product: ProductStoreType) => (
    product.id === action.id && 
    product.hireDate === action.hireDate &&
    product.startTime === action.startTime &&
    product.endTime === action.endTime
  );

  return state.cartItems.findIndex(sameProduct);
};

type AddProductType = {
  product: ProductStoreType,
  count: number,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddProductType>) => {
      const index = indexSameProduct(state, action.payload.product);
      if (index !== -1) {
        state.cartItems[index].count += action.payload.count;
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload.product]
        };
      }
    },
    removeProduct(state, action: PayloadAction<ProductStoreType>) {
      // find index of product
      state.cartItems.splice(indexSameProduct(state, action.payload), 1);
    },
    setCount(state, action: PayloadAction<AddProductType>) {
      // find index and add new count on product count
      const indexItem = indexSameProduct(state, action.payload.product);
      state.cartItems[indexItem].count = action.payload.count;
    },
  },
})

export const { addProduct, removeProduct, setCount } = cartSlice.actions
export default cartSlice.reducer