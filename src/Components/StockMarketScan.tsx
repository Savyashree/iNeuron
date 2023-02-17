import { createContext, useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../index.css"

export const STOCKS_DATA = createContext<any[]>([])
export default function StockMarketScans(props: { stocksData: any[]; }) {

    const stocksData = props.stocksData;
    const navigate = useNavigate();
    function redirectTo(id: any) {
        navigate('/details/' + id, { state: { details: props.stocksData[id - 1] }, replace: true },);
    }

    return (

        <div style={{
            margin: "auto",
            width: "80%",
            top: "200px",
            position: "relative"
        }}>
            {stocksData && stocksData.map(item => {
                return (
                    <div key={item.id} data-testid="container" className=" hover:cursor-pointer overflow-hidden bg-white shadow sm:rounded-md md:max-w-[80vw] ">
                        <ul role="list" className="divide-y divide-gray-200">
                            <a className="block hover:bg-gray-50" onClick={() => redirectTo(item.id)}>
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div className="truncate">
                                            <div className="flex">
                                                <p className="truncate font-medium text-indigo-600">{item.name}</p>
                                            </div></div>
                                    </div>
                                    <div >
                                        {item.color === "red" ? <p className={`bg-red-100 text-red-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5`}>{item.tag}</p> : <p className={`bg-green-100 text-green-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5`}>{item.tag}</p>}
                                    </div>
                                    <div className="ml-5 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                        </svg>
                                    </div>

                                </div >
                            </a>
                        </ul>
                    </div >
                )
            })}
        </div >
    )

}