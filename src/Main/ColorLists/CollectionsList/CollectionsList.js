import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
//import CollectionLogo from "./CollectionLogo"
import CollectionItem from "./CollectionItem"
import { useSelector } from "react-redux"

function CollectionsList() {
    const [isOpen, setIsOpen] = useState(false)
    const collections = useSelector(state => state.colors.collections)

    let collectionsNames = Object.keys(collections)

    function toggleList() {
        setIsOpen(prevState => !prevState)
    }

    useEffect(() => {
        function checkBlur(e) {
            //checks id, and every child here has that id
            if(e.target.id==='collections') return
            setIsOpen(false)
        }
        window.addEventListener('click', checkBlur)
        return () => {
            window.removeEventListener('click', checkBlur)
        }
    }, [isOpen])

    return (
        <div id="collections" className="z-10 py-2 w-full select-none relative">
            <div id="collections" onClick={toggleList} className="cursor-pointer p-2 pt-0 select-none flex justify-between items-center">
                <p id="collections">Collections</p>
                <FontAwesomeIcon id="collections" style={{transform: isOpen?'rotate(180deg)':''}}
                 className="text-sm transition-all duration-200" icon={faChevronDown} />
            </div>
            {isOpen && 
            <ul id="collections" className="
                rounded-md flex flex-col min-w-min max-h-64 overflow-auto 
                bg-slate-300 w-full
                absolute">
                {
               collectionsNames.length > 0 ? 
               collectionsNames.map(collection => <CollectionItem key={collection} collection={collection} />)
                :''}
            </ul>}
        </div>
        
    )
}

export default CollectionsList
