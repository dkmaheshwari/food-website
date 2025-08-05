import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import cartSlice from "./cartSlice";
import restaurantListSlice from "./restaurantListSlice";
import locationSearchVisibility from "./locationSearchVisibilitySlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    location: locationSlice,
    cart: cartSlice,
    restaurantList: restaurantListSlice,
    locSearch: locationSearchVisibility,
    auth: authSlice,
  },
});

export default store;
