import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist config for the cart slice
const persistCartConfig = {
  key: "cart",
  storage,
};

// Persisted cart reducer
const persistedCartReducer = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {cart: CartState}
export type AppDispatch = typeof store.dispatch;
