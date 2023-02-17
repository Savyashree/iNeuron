import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


export default function StockMarketVariablePage() {

    const navigate = useNavigate();
    const location = useLocation();
    const variable = location.state.details_variable;

    const [value, setValue] = useState(variable.default_value);


    function onBackButtonClick() {
        navigate('/details/' + location.state.stockId);

    }


    function addValues() {
        return (
            <div>
                <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
                <ul role="list" className="divide-y divide-gray-200" >
                    {variable.values.map((item: any, detailIndex: any) => {
                        return (
                            <li key={detailIndex} className="flex py-4" >
                                <p className="font-medium text-gray-900" >{item}</p >

                            </li >
                        )
                    })}
                </ul >
            </div>
        )
    }
    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function addIndicators() {
        return (
            <div >
                <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
                <p className="font-medium text-gray-900 mt-5 text-lg" >{variable.study_type.toUpperCase()}</p >
                <p className="font-medium text-gray-500 mt-5 text-sm" >period</p >

                <div className="mt-2">
                    <input type="number" name="param_value" id="param_value" max={variable.max_value} min={variable.min_value} className="block w-full rounded-md border-[0.1px] border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-3" placeholder="period value" value={value} onChange={onInputChange} />

                </div>
            </div >
        )
    }
    return (

        <div style={{
            margin: "auto",
            width: "35%",
            top: "200px",
            position: "relative"
        }}>
            <button className="inline-flex gap-2 items-center my-3" onClick={() => { onBackButtonClick() }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Go back</button>
            <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull" >
                <h1 className="text-2xl font-medium leading-6 text-gray-900" >Variable params</h1>

                <ul role="list" className="divide-y divide-gray-200" >
                    {variable.type === "value" ? addValues() : addIndicators()}
                </ul>
            </div >
        </div >
    )
}