import { imageHelper } from "../helpers/imageHelper";


function Header() {
    return (
       <header className="bg-brand-primary p-7 flex justify-center">
            <img src={imageHelper.logo} className="w-36 sm:w-40"/>
       </header>
    )
}

export default Header;