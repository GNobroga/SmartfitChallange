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

export const getLocations = (showClosedUnit = false) => async (dispatch: AppDispatch) => {
    try {
        dispatch(startFetch());
        const req = await fetch(apiConfig.baseUrl);
        const data = await req.json();
     
        const locations: ILocation[] = (data.locations as  ILocation[])
            .filter(x => x.schedules?.length > 0)
            .map(x => {
                x.isOpen = false;
                return x;
            });
            
        const filtered = filterLocationsAndAddIsOpenFlag(locations, showClosedUnit);

        setTimeout(() => dispatch(success(filtered)), 500);
        return filtered;
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
 */

const getWeekDayList = (weekdays: string) => {
    const weekdayList: number[] = [];
    const params = weekdays.split(' à ').map(x => getDayofWeek(x as WEEK));
    for (let i = params[0]; i <= (params[1] ?? params[0]) ; i++) {
        weekdayList.push(i);
    }
    return weekdayList;
}

const splitHoursAndGetWithMinutes = (hour: string) => {
    const rangeHourSplited = hour.split(' às ');
    const bottom = rangeHourSplited[0].split('h').map(value => value === '' ? '0' : value);
    const top = rangeHourSplited[1].split('h').map(value => value === '' ? '0' : value);
    const bottomDate = new Date();
    const topDate = new Date();
    bottomDate.setHours(parseInt(bottom[0]), parseInt(bottom[1]), 0);
    topDate.setHours(parseInt(top[0]), parseInt(top[1]), 0);
    return {
        below: bottomDate,
        above: topDate,
    };
}
export const filterLocationsAndAddIsOpenFlag = function(locations: ILocation[], showClosedUnit = false) {
    if (!locations) return [];

    const isOpened = (schedule: ISchedule) => {
        if (!/^\d{2}h(\d{2})?\sàs\s\d{2}h(\d{2})?$/.test(schedule.hour)) {
            return false;
        }

        const today = new Date();

        const { below, above } = splitHoursAndGetWithMinutes(schedule.hour);

        const currentTime = today.getTime();
  
        return currentTime >= below.getTime() && currentTime <= above.getTime() 
            && getWeekDayList(schedule.weekdays).includes(today.getDay());
    };

    let results = locations.map(location => {
        location.isOpen = location.schedules.some(isOpened);
        return location;
    });

    if (!showClosedUnit) {
        results = results.filter(x => x.isOpen);
    } else {
        results.sort((x, y) => new Number(x.isOpen) <  new Number(y.isOpen) ?  1 : -1);
    }

    return results;
};


export type Period = '06h às 12:00' | '12h01 às 18:00' | '18:01 às 23:00';

const convertPeriodToDate = (period: Period) => {
    const periodStart: number[] = [18, 0];
    const periodFinish: number[] = [23, 0];

    if (period === '06h às 12:00') {
        periodStart[0] = 6;
        periodStart[1] = 0;
        periodFinish[0] = 12;
    } 

    if (period === '12h01 às 18:00') {
        periodStart[0] = 12;
        periodFinish[0] = 18;
    }

    const periodStartDate = new Date();
    const periodFinishDate = new Date();

    periodStartDate.setHours(periodStart[0], periodStart[1] ,0);
    periodFinishDate.setHours(periodFinish[0], periodFinish[1] ,0);

    return { periodStartDate, periodFinishDate };
}



export const filterPerPeriod = (period: Period, data: ILocation[] | null) => {
   if (!data) return [];
    
   const { periodStartDate, periodFinishDate } = convertPeriodToDate(period);
 
   const filterSchedules = (schedule: ISchedule) => {

        const { below, above } = splitHoursAndGetWithMinutes(schedule.hour);

        return (
            (below.getTime() >= periodStartDate.getTime() && below.getTime() <= periodFinishDate.getTime()) 
                &&
            (above.getTime() >= periodStartDate.getTime() && above.getTime() <= periodFinishDate.getTime()) 
                &&
            (getWeekDayList(schedule.weekdays).includes(new Date().getDay()))
         
        );
    };

    const isValidSchedule = (arg: ISchedule) => !arg.hour.toLowerCase().includes('fechada') && /^\d{2}h(\d{2})?\sàs\s\d{2}h(\d{2})?$/.test(arg.hour);

    return data.map(
        location => {
            const isOpen = location.schedules.filter(isValidSchedule).some(filterSchedules);
            return {...location, isOpen };
        }
    );
};


export default slice.reducer;