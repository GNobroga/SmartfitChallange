import { imageHelper } from "../helpers/imageHelper";

function Legend() {
    return (
        <section className="flex flex-col sm:flex-row border shadow-sm flex-wrap sm:justify-center gap-8 bg-brand-tertiary  p-4 rounded-md">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-sm font-bold">Máscara</h1>
                <div className="flex gap-3 justify-center">
                    <span className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.requiredMask} className="w-14"/>
                        <span className="text-sm">Obrigatório</span>
                    </span>
                    <span  className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.recommendedMask} className="w-14"/>
                        <span className="text-sm">Recomendado</span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <h1 className="text-sm font-bold">Toalha</h1>
                <div className="flex gap-3 justify-center">
                    <span className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.requiredTowel} className="w-14"/>
                        <span className="text-sm">Obrigatório</span>
                    </span>
                    <span  className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.recommendedTowel} className="w-14"/>
                        <span className="text-sm">Recomendado</span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <h1 className="text-sm font-bold">Bebedouro</h1>
                <div className="flex gap-3 justify-center">
                    <span className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.partialFountain} className="w-14"/>
                        <span className="text-sm">Parcial</span>
                    </span>
                    <span  className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.forbiddenFountain} className="w-14"/>
                        <span className="text-sm">Proibido</span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <h1 className="text-sm font-bold">Vestiários</h1>
                <div className="flex gap-3 justify-center">
                    <span className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.requiredLockerrom} className="w-14"/>
                        <span className="text-sm">Liberado</span>
                    </span>
                    <span  className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.partialLockrroom} className="w-14"/>
                        <span className="text-sm">Parcial</span>
                    </span>
                    <span  className="flex flex-col items-center justify-center gap-2">
                        <img src={imageHelper.forbiddenLockerroom} className="w-14"/>
                        <span className="text-sm">Fechado</span>
                    </span>
                </div>
            </div>

        </section>
    );
}

export default Legend;