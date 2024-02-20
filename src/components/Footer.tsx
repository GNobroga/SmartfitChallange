import { imageHelper } from "../helpers/imageHelper";

function Footer() {
    return (
        <footer className="bg-brand-primary items-center text-white flex flex-col gap-3 sm:gap-2 sm:pb-14 p-5">
            <img src={imageHelper.logo} className="w-28"/>
            <p className="text-xs text-center">Todos os direitos reservados - <br className="sm:hidden"/> 2024</p>
        </footer>
    )
}

export default Footer;