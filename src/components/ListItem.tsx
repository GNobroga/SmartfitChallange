import { imageHelper } from "../helpers/imageHelper";
import { ILocation } from "../models/location.model";

interface IProps {
    data: ILocation;
}

function ListItem({ data }: IProps) {
    const showSchedules = () => {
        if (!data.isOpen) return null;


        return (
            <div className="mt-5 grid grid-col-1 md:grid-cols-2 gap-2">
            {
                data.schedules?.map((schedule, index) => {
                return (
                        <div className="flex flex-col gap-1" key={index}>
                        <h1 className="font-bold">{schedule.weekdays}</h1>
                            <div className="text-xs sm:text-sm flex gap-5 flex-wrap">
                                <span>{schedule.hour}</span>
                            </div>
                    </div>
                );
                })
            }
            </div>
       
        );
    }

    const showRules = () => {
        if (!data.isOpen) return null;
        
        return (
            <>
                { data.mask === 'recommended' ? <img src={imageHelper.recommendedMask} className="w-12" /> : <img src={imageHelper.requiredMask} className="w-12" />}
                { data.towel === 'recommended' ? <img src={imageHelper.recommendedTowel} className="w-12" /> : <img src={imageHelper.requiredTowel} className="w-12" />}
                { data.fountain === 'not_allowed' ?  <img src={imageHelper.forbiddenFountain} className="w-12" /> : <img src={imageHelper.partialFountain} className="w-12" />}
                { data.locker_room === 'partial' ? <img src={imageHelper.partialLockrroom} className="w-12" /> : data.locker_room === 'closed' ? 
                    <img src={imageHelper.forbiddenLockerroom} className="w-12"/> : <img src={imageHelper.requiredLockerrom} className="w-12"/>}
            </>
        );
    };

    return (
        <li className="bg-brand-tertiary p-5 flex flex-col flex-wrap  flex-1 min-w-[250px]  min-h-[400px] rounded-md shadow-md border">
            <span className={`text-green-400 text-xs font-bold ${data.isOpen ? 'text-green-500' : 'text-red-500'}`}>{data.isOpen ? 'Aberto' : 'Fechado'}</span>
            <h1 className="mt-3 font-semibold text-xl">{ data.title }</h1>
            <p className={`text-xs opacity-60 ${data.isOpen ? 'border-b-2' : ''} pb-2 mt-4`} dangerouslySetInnerHTML={{ __html: data.content }}></p>
            <div className="flex gap-3 mt-4 flex-wrap">{ showRules() }</div>
            { showSchedules() }
        </li>
    );
}

export default ListItem;