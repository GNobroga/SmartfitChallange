import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import { apiConfig } from "../../config/apiConfig";
import { ILocation, ISchedule } from "../../models/location.model";

interface IState {
    loading: boolean;
    error: Error | null;
    data: ILocation[] | null;
}

const initialState = {
    loading: false,
    error: null,
    data: null,
} as IState;

const slice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        startFetch(state) {
            state.error = null;
            state.loading = true;
        },
        success(state, { payload }) {
            state.error = null;
            state.loading = false;
            state.data = payload;
        },
        failure(state, { payload }) {
            state.error = payload;
            state.loading = false;
            state.data = null;
        }
    }
})

export const { startFetch, success, failure } = slice.actions;

export const getLocations = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(startFetch());
        const req = await fetch(apiConfig.baseUrl);
        const data = await req.json();
     
        const locations = data.locations as ILocation[];
        const filtered = filterLocationsAndAddIsOpenFlag(locations);
        dispatch(success(filtered));
    } catch (error) {
        dispatch(failure(new Error('Um erro ocorreu, tente novamente mais tarde!')));
    }
};

type WEEK = 'Dom.' | 'Seg.' | 'Ter.' | 'Qua.' | 'Qui.' | 'Sex.' | 'Sáb.';

const getDayofWeek = (day: WEEK) => {
    const DAY_OF_WEEK: Record<WEEK, number> = {
        'Dom.': 0,
        'Seg.': 1,
        'Ter.': 2,
        'Qua.': 3,
        'Qui.': 4,
        'Sex.': 5,
        'Sáb.': 6 
    };

    return DAY_OF_WEEK[day];
}

/**
 * Essa função verificar quais unidades estão abertas no momento já que no arquivo disponibilizado no desafio todas estão como abertas.
 * 
 */
export const filterLocationsAndAddIsOpenFlag = function(locations: ILocation[]) {
    if (!locations) return [];

    const isOpened = (schedule: ISchedule) => {
        if (!/^\d{2}h(\d{2})?\sàs\s\d{2}h(\d{2})?$/.test(schedule.hour)) {
            return false;
        }

        const today = new Date();

        const weekdays = schedule.weekdays.split(' à ').map(x => getDayofWeek(x as WEEK));

        const scheduleHours =  schedule.hour.split(' às ');

        const bottomHoursAndMinutes = scheduleHours[0].split('h');
        const bottomHours = parseInt(bottomHoursAndMinutes[0]);
        const bottomMinutes = parseInt(!bottomHoursAndMinutes[1] || bottomHoursAndMinutes[1] === '' ? '0' : bottomHoursAndMinutes[1]);
        const bottomDate = new Date();
        bottomDate.setHours(bottomHours);
        bottomDate.setMinutes(bottomMinutes);

        const topHoursAndMinutes = scheduleHours[1]?.split('h');

        const topHours = parseInt(topHoursAndMinutes[0]);

        const topMinutes = parseInt(!topHoursAndMinutes[1] || topHoursAndMinutes[1] === '' ? '0' : topHoursAndMinutes[1]);
    
        const topDate = new Date();

        topDate.setHours(topHours);
        topDate.setMinutes(topMinutes);
        
        const currentTime = today.getTime();

        return (currentTime >= bottomDate.getTime() && currentTime <= topDate.getTime()) 
            && (today.getDay() < weekdays[0] || weekdays[1] > today.getDay());
    };

    return locations.map(location => {
        return { ...location, isOpen: location.schedules?.some(isOpened) ?? false };
    });
};


export type Period = '06h às 12:00' | '12h01 às 18:00' | '18:01 às 23:00';

const convertPeriodToDate = (period: Period) => {
    const start = new Date();
    const end = new Date();

    if (period === '06h às 12:00') {
        start.setHours(6, 0, 0);
        end.setHours(12, 0, 0);
    } 
    else if (period === '12h01 às 18:00') {
        start.setHours(12, 1, 0);
        end.setHours(18, 0, 0);
    }
    else {
        start.setHours(18, 1, 0);
        end.setHours(23, 0, 0);
    }

    return { 
        start: { 
            hour: start.getHours(), minutes: start.getMinutes() 
        }, 
        end: {
            hour: end.getHours(), minutes: end.getMinutes() ,
        },
    };
}



export const filterPerPeriod = (period: Period, locations: ILocation[] | null) => {
   if (!locations) return [];
    
   const { start, end } = convertPeriodToDate(period);

   const filter = (schedule: ISchedule) => {
        const scheduleHours =  schedule.hour.split(' às ');

        const bottomHoursAndMinutes = scheduleHours[0].split('h');
        const bottomHours = parseInt(bottomHoursAndMinutes[0]);
        const bottomMinutes = parseInt(!bottomHoursAndMinutes[1] || bottomHoursAndMinutes[1] === '' ? '0' : bottomHoursAndMinutes[1]);
        const bottomDate = new Date();
        bottomDate.setHours(bottomHours);
        bottomDate.setMinutes(bottomMinutes);

        const topHoursAndMinutes = scheduleHours[1]?.split('h');

        const topHours = parseInt(topHoursAndMinutes[0]);

        const topMinutes = parseInt(!topHoursAndMinutes[1] || topHoursAndMinutes[1] === '' ? '0' : topHoursAndMinutes[1]);

        const topDate = new Date();

        topDate.setHours(topHours);
        topDate.setMinutes(topMinutes);

        return (start.hour >= topDate.getHours() && start.minutes >= topDate.getMinutes()) &&
            ((end.hour <= topDate.getHours() && end.minutes <= topDate.getMinutes()));
    };

    return locations.filter(x => x.schedules.some(filter));
};


export default slice.reducer;