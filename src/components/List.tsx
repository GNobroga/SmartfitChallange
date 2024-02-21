import { ILocation } from "../models/location.model";
import ListItem from "./ListItem";

interface IProps {
    data: ILocation[] | null;
}

function List({ data }: IProps) {

    if (!data?.length) 
        return <div className="text-center pb-4 text-xs">Nenhuma unidade encontrada.</div>


    return (
        <ul className="flex flex-wrap justify-between gap-5">
            {
                data.map((location, index) => <ListItem key={index} data={location}/>)
            }
        </ul>
    );
}

export default List;