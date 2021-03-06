import React, { useState, useEffect } from 'react'
import { getCurrentDateTime, onSearchQuery, onSearchClick, writeDataToDatabase } from './Utilities';
import { HiX } from 'react-icons/hi'
import plates from '../json/plates.json'

const UserAdd = ({ user, setState, position }) => {

    const [stateChange, setStateChange] = useState(0);
    const [userId, setUserId] = useState('');
    const [price, setPrice] = useState('');
    const [fee, setFee] = useState('');
    const [tripId, setTripId] = useState('');
    const [plate, setPlate] = useState('');
    const [comment, setComment] = useState('');

    const [plateList, setPlateList] = useState([]);
    const [selfSearch, setSelfSearch] = useState(false);

    useEffect(() => {
        setUserId('');
        setPrice('');
        setFee('');
        setTripId('');
        setPlate('');
        setComment('');
    },[stateChange]);
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        writeDataToDatabase('userDatabase', {
            userId: userId,
            price: parseInt(price),
            fee: parseInt(price),
            tripId: tripId,
            plate: plate,
            comment: comment,
            staff: user.email,
            status: 'open',
            statusMessage: 'Ticket megnyitva ' + getCurrentDateTime() + ' dátummal.',
            priority: 'low',
            timestamp: getCurrentDateTime(),
        }, stateChange, (stateChange) => setStateChange(stateChange))
    }

    return (
        <div onClick={() => setSelfSearch(false)} className='dashboard-card'>
            <div className="absolute w-full top-3 px-3 flex items-center justify-center">
                <p className="text-xs font-semibold mr-auto text-slate-500 pl-2">RÉSZLETFIZETŐ HOZZÁADÁSA</p>
                <HiX onClick={() => {localStorage.removeItem(position);sessionStorage.removeItem(position);(position === 'middle' ? setState(sessionStorage.getItem(position)) : setState(localStorage.getItem(position)))}} className='cursor-pointer ml-auto text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600 text-lg'/>
            </div>
            <form onSubmit={onFormSubmit} className="py-10 px-4 h-full w-full flex flex-col items-center justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-content-center gap-x-4 gap-y-3 xl:gap-y-4">
                    <input value={userId} onChange={(e) => setUserId(e.target.value)} required placeholder='User ID*' type="text" className={`input-box`} />
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400 text-sm">Ft</p>
                        <input value={price} onChange={(e) => {setPrice(e.target.value)}} required placeholder='Összeg*' type="number" className={`input-box pr-8`} />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <p className="absolute right-3 text-slate-500 dark:text-slate-400 text-sm">Ft</p>
                        <input value={fee} onChange={(e) => setFee(e.target.value)} required placeholder='Eljárási díj*' type="number" className={`input-box pr-8`} />
                    </div>
                    <input value={tripId} onChange={(e) => setTripId(e.target.value)} placeholder='Trip ID' type="text" className={`input-box`} />
                    <div onClick={(e) => e.stopPropagation()}  className="relative flex items-center justify-center">
                        <input onFocus={() => setSelfSearch(true)} value={plate} onChange={(e) => onSearchQuery(e.target.value.trim().replace('-','').toUpperCase().substring(0,6), (plate) => setPlate(plate), plates, (plateList) => setPlateList(plateList), (selfSearch) => setSelfSearch(selfSearch))} placeholder='Rendszám' type="text" className={`input-box`} />
                        {(plate !== '' && selfSearch) ? 
                        <div className="w-full absolute top-[105%] rounded-lg max-h-24 bg-slate-200 dark:bg-gray-700 shadow shadow-slate-300 dark:shadow-gray-800 overflow-y-scroll scrollbar-hide">
                            {plateList.map((plate) => (
                                <div onClick={() => onSearchClick(plate, (plate) => setPlate(plate), (selfSearch) => setSelfSearch(selfSearch))} key={plate} className="px-1 flex items-center hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-600 dark:text-slate-400">
                                    <p className="py-2 px-3 text-left text-xs">{plate}</p>
                                </div>
                            ))}
                        </div> : ''}
                    </div>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Komment' type="text" className={`input-box`} />
                    <button className="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-sm text-white dark:text-slate-300 w-full rounded-full py-1">Leadás</button>
                </div>
            </form>
        </div>
    )
}

export default UserAdd
