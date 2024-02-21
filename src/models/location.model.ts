export interface ISchedule {
    weekdays: string;
    hour: string;
}

export interface ILocation {
    id: number;
    title: string;
    content: string;
    isOpen: boolean;
    mask: 'required' | 'recommended';
    towel: 'required' | 'recommended';
    fountain: 'not_allowed' | 'partial';
    locker_room: 'allowed' | 'closed' | 'partial';
    schedules: ISchedule[];
}