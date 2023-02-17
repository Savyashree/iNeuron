import { match } from "assert";
import React from "react";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useContext } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { STOCKS_DATA } from "./StockMarketScan";



export default function StockMarketDetails(props: { stockData: any; }) {

    const stockId = useParams().id;
    const navigate = useNavigate();
    const stocksData = props.stockData;
    const currentDetails = stocksData.at(parseInt(stockId!) - 1);

    function onBackButtonClick() {
        navigate('/', { replace: false });
    }

    function onVariableClick(stockId: any, detailId: any, value: any) {
        console.log(stockId - 1, detailId, value)
        navigate('/variable/' + value + "/" + stockId, {
            state: {
                details_variable: stocksData[stockId - 1].criteria[detailId].variable[value],
                stockId: stockId,

            }, replace: true
        });
    }
    return (
        <div style={{
            margin: "auto",
            width: "50%",
            top: "200px",
            position: "relative"
        }}>
            <button className="inline-flex gap-2 items-center my-3" onClick={() => { onBackButtonClick() }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Go back</button>
            <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull" >
                <h3 className="text-2xl font-medium leading-6 text-gray-900" >{currentDetails.name}</h3>
                <div className="mt-3 flex flex-shrink-0">
                    {currentDetails.color === "red" ? <p className={`bg-red-100 text-red-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5`}>{currentDetails.tag}</p> : <p className={`bg-green-100 text-green-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5`}>{currentDetails.tag}</p>}
                </div >
                <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
                <ul role="list" className="divide-y divide-gray-200" >
                    {currentDetails.criteria.map((item: any, detailIndex: any) => {
                        console.log(stockId)
                        if (item.type === "plain_text") {
                            console.log(item.type)
                            return (
                                <li key={detailIndex} className="flex py-4" >
                                    <p className="font-medium text-gray-900" >{item.text}</p >

                                </li >
                            )
                        }
                        else if (item.type === "variable") {
                            console.log(item.type)
                            const regex = /\$\d+/g; // regular expression to match all numbers
                            const splitText = item.text?.toString().split(regex); // split the text based on the numbers
                            const matches = item.text?.toString().match(regex); // get all the matched numbers
                            console.log(item.text, splitText, matches)

                            return (
                                <li key={detailIndex} className="flex py-4" >
                                    <p className="font-medium text-gray-900" >
                                        {splitText!.map((text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, index: string | number) => (
                                            <React.Fragment>
                                                {text}
                                                {matches![index] && (
                                                    <a className="hover:cursor-pointer" onClick={() => { onVariableClick(stockId, detailIndex, matches![index]) }}> <span className="font-medium text-indigo-600">{" " + matches![index] + " "}</span></a>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </li>
                            )
                        }

                    })}
                </ul >
            </div >
        </div >

    )


}