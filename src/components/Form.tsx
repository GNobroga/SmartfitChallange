
import { imageHelper } from "../helpers/imageHelper";
import { filterPerPeriod, getLocations, success } from "../store/reducers/location.reducer";
import { useDispatch, useSelector } from "react-redux";
import { setPeriod, setShowClosedUnit } from "../store/reducers/filter.reducer";
import { AppState } from "../store";

function Form() {

    const dispatch = useDispatch();
    const period = useSelector((selector: AppState) => selector.filter.period);
    const data = useSelector((selector: AppState) => selector.location.data);
    const showClosedUnit = useSelector((selector: AppState) => selector.filter.showClosedUnit);

    const onSearchRequest = async () => {
        if (period) {
            const data = await dispatch(getLocations(showClosedUnit) as any);
            dispatch(success(filterPerPeriod(period, data)));
        } else {
            console.log(showClosedUnit)
            dispatch(getLocations(showClosedUnit) as any);
        }
    };

    const clear = () => {
        dispatch(getLocations() as any);
        dispatch(setPeriod(null));
        dispatch(setShowClosedUnit(false));
    }

    return (
      <form className="p-5 sm:pb-8 border-2 rounded-xl  flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-2">
            <img src={imageHelper.iconHour} className="w-9 h-9"/>
            <span className="text-sm opacity-65">Horário</span>
        </div> 
        <h1 className="opacity-65  text-xl sm:text-2xl ps-2 border-b pb-2">Qual período <br className="sm:hidden"/> quer treinar?</h1>
        <ul className="flex flex-col flex-wrap gap-3">
            <li className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-2">
                    <input type="radio" className="sm:w-4" name="period" checked={period === '06h às 12:00'} onChange={() => dispatch(setPeriod('06h às 12:00'))}/>
                    <span className="opacity-65">Manhã</span>
                </div>
                <span className="opacity-65">06:00 às 12:00</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-2">
                    <input type="radio" className="sm:w-4" name="period" checked={period === '12h01 às 18:00'} onChange={() => dispatch(setPeriod('12h01 às 18:00'))}/>
                    <span className="opacity-65">Tarde</span>
                </div>
                <span className="opacity-65">12:01 às 18:00</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-2">
                    <input type="radio" className="sm:w-4" name="period" checked={period === '18:01 às 23:00'} onChange={() => dispatch(setPeriod('18:01 às 23:00'))}/>
                    <span className="opacity-65">Noite</span>
                </div>
                <span className="opacity-65">18:01 às 23:00</span>
            </li>
        </ul>
      <div className="flex flex-col sm:flex-row justify-between gap-5">
        <div className="flex gap-2 items-center">
                <input type="checkbox" name="showClosedUnit" checked={showClosedUnit} onChange={() => dispatch(setShowClosedUnit(!showClosedUnit))}/>
                <span>Exibir unidades fechadas</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <span>Resultados encontrados: </span>
                <span className="font-bold text-base">{ data?.length ?? 0 }</span>
            </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={onSearchRequest} type="button" className="flex-1 bg-brand-secondary hover:opacity-70 rounded-md shadow-md text-sm uppercase font-semibold p-2">Encontrar <br className="sm:hidden"/> Unidade</button>
            <button onClick={clear} type="button" className=" flex-1 border hover:opacity-80 rounded-md shadow-md text-sm uppercase font-semibold p-3">Limpar</button>
        </div>
      </form>
    )
}

export default Form;