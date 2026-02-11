import {Link} from "react-router-dom"
import OutlineBtn from "./OutlineBtn.jsx"

function IsThereAnIssue() {
    return (
        <div className="w-full flex items-center justify-center gap-4 mt-auto pb-4">
            <h3 className="text-gray-500 text-lg whitespace-nowrap">Vai ir radusies kļūda?</h3>
            <Link to="/support">
                <OutlineBtn text="Atbalsts"/>
            </Link>
        </div>
    )
}

export default IsThereAnIssue