function Presentation() {
    return (
       <div className="flex flex-col gap-4 sm:mt-7">
            <h1 className="font-bold text-3xl sm:text-4xl uppercase after:block after:h-2 after:w-24 sm:after:w-20 after:bg-brand-primary flex flex-col gap-3">Reabertura <br/> Smart Fit</h1>
            <p className="text-sm text-justify  mt-3">
               O horário de funcionamento das nossas unidades está seguindo os decretos de cada município. Por isso, configra aqui se a sua unidade está aberta e as medidas de segurança que estamos seguindo.
            </p>
       </div>
    )
}

export default Presentation;