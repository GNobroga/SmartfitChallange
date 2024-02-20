import { imageHelper } from "../helpers/imageHelper";


interface IProps {

}

function ListItem() {
    return (
        <li className="bg-brand-tertiary p-5 flex flex-col  max-w-[300px] rounded-md shadow-md border">
            <span className="text-green-400 text-sm">Aberto</span>
            <h1 className="mt-3">Vicente Linhares</h1>
            <p className="text-xs opacity-60 border-b-2 pb-2 mt-4">
                Rua Tirbúcio Calvancante, 1885 - <br/>
                Meireles <br/>
                Fortaleza, CE
            </p>
            <div className="flex gap-3 mt-4 flex-wrap">
                <img src={imageHelper.requiredMask} className="w-12" />
                <img src={imageHelper.requiredTowel} className="w-12" />
                <img src={imageHelper.partialFountain} className="w-12" />
                <img src={imageHelper.forbiddenLockerroom} className="w-12" />
            </div>
            <div className="mt-5 flex flex-col gap-4">
               <div className="flex flex-col gap-1">
                <h1 className="font-bold">Seg. à Sex. Sáb.</h1>
                    <div className="text-xs flex gap-5 flex-wrap">
                        <span>06h às 22h</span>
                        <span>09h às 18h</span>
                    </div>
               </div>
               <div className="flex flex-col gap-1">
                <h1 className="font-bold">Dom.</h1>
                    <div className="text-xs flex gap-5 flex-wrap">
                       <span>Fechada</span>
                    </div>
               </div>
            </div>
        </li>
    );
}

export default ListItem;