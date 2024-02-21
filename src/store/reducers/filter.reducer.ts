import { createSlice } from "@reduxjs/toolkit";
import { Period } from "./location.reducer";

interface IState {
    period: Period | null;
    showClosedUnit: boolean;
}

const initialState: IState = {
    period: null,
    showClosedUnit: false,
};

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setPeriod(state, { payload }) {
            state.period = payload;
        },
        setShowClosedUnit(state, { payload }) {
            state.showClosedUnit = payload;
        }
    }
});

export const { setPeriod, setShowClosedUnit } = slice.actions;

export default slice.reducer;