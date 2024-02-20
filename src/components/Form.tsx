import React from "react";
import { imageHelper } from "../helpers/imageHelper";

function Form() {
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
                    <input type="radio" className="sm:w-4"/>
                    <span className="opacity-65">Manhã</span>
                </div>
                <span className="opacity-65">06:00 às 12:00</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-2">
                    <input type="radio" className="sm:w-4" />
                    <span className="opacity-65">Tarde</span>
                </div>
                <span className="opacity-65">12:01 às 18:00</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-2">
                    <input type="radio" className="sm:w-4" />
                    <span className="opacity-65">Noite</span>
                </div>
                <span className="opacity-65">18:01 às 23:00</span>
            </li>
        </ul>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex gap-2 iems-center">
                <input type="checkbox" />
                <span>Exibir unidades fechadas</span>
            </div>
            <div className="flex items-center gap-2">
                <span>Resultados encontrados: </span>
                <span className="font-bold text-xl">0</span>
            </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex-1 bg-brand-secondary hover:opacity-70 rounded-md shadow-md text-sm uppercase font-semibold p-2">Encontrar <br className="sm:hidden"/> Unidade</button>
            <button className=" flex-1 border hover:opacity-50 rounded-md shadow-md text-sm uppercase font-semibold p-3">Limpar</button>
        </div>
      </form>
    )
}

export default Form;