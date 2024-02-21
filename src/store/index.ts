import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./reducers/location.reducer";
import filterReducer from "./reducers/filter.reducer";

const store = configureStore({
    reducer: {
        location: locationReducer,
        filter: filterReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
