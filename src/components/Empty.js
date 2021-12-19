import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { menuItems } from './MenuItems';

const Empty = (props) => {

    const [dashboardArray, setDashboardArray] = useState([localStorage.getItem('topLeft'), localStorage.getItem('topRight'), localStorage.getItem('bottomLeft'), localStorage.getItem('bottomRight')])

    useEffect(() => {
        setDashboardArray([localStorage.getItem('topLeft'), localStorage.getItem('topRight'), localStorage.getItem('bottomLeft'), localStorage.getItem('bottomRight')])
    },[props.stateChange])

    return (
        <div className='relative w-full h-full flex items-center justify-center group bg-slate-200 hover:bg-slate-300 rounded-lg'>
            <div className="absolute hidden group-hover:flex mx-10 justify-center bg-white rounded-full px-6 space-x-8 py-3 shadow shadow-slate-400 text-slate-200">
                {menuItems.map((item) => (
                    <div onClick={() => {localStorage.setItem(props.position, item.state);props.setStateChange(props.stateChange+1)}} key={uuidv4()} className={`w-full items-center justify-center hover:text-blue-600 group ${dashboardArray.includes(item.state) ? 'hidden' : 'flex'}`}>
                            {item.icon}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Empty