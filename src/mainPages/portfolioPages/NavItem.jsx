
import React from 'react'

const NavItem = ({ icon, label, active }) => {
    return (
        <div>
            <div className={`flex items-center gap-2 cursor-pointer hover:text-red-500 ${active ? "text-red-500" : "text-gray-600"}`}>
                {icon}<span>{label}</span>
            </div>
        </div>
    )
}

export default NavItem
