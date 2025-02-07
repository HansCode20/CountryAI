import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_COUNTRIES } from "../graphql/queries"
import "../style/MainBackground.css"
import ChatBox from "../components/ChatBox"
import Profile from "../auth/Profile"

function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES)
  const [showAll, setShowAll] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const handleSeeAll = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setShowAll(true);
      setLoadingMore(false);
    }, 1000);
 };

 const handleCloseAll = () => {1111111

 };

  if (loading) return <div className="main-bg min-h-screen flex justify-center items-center">Loading...</div>
  if (error) return <p>{error.message}</p>

  return (
  <>
     {/* profile Oauth */}
      <Profile/>

      <div className="main-bg min-h-screen flex flex-col items-center p-0 md:p-20 lg:p-20">
        <div className="w-full max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-10">
            { (showAll ? data.countries : data.countries.slice(0, 18)).map((country, index) => (
              <div 
                key={country.code} 
                className={`group overflow-hidden relative flex justify-between items-center p-4 border-b-2 border-gray-100 text-center ${
                  index % 3 !== 2 ? "border-r-2" : ""
                }`}
              >
                <span className="text-3xl group-hover:opacity-0">{country?.emoji}</span>
                <h4 className="text-xs w-1/2 group-hover:opacity-0">{country?.name}</h4>
                <img 
                src="https://img.icons8.com/material-outlined/right.png" 
                alt="right" 
                className="w-4 group-hover:opacity-0"
                />

                {/* Hover  */}
                <div className="absolute top-0 left-0 p-2 w-full h-full  flex items-center opacity-0 group-hover:opacity-100 group-hover:overflow-auto group-hover:bg-black/75 transition duration-300">
                  <div className="flex items-center space-x-3">
                    <span className="bg-white p-2 text-xl rounded-full">{country?.emoji}</span>
                    <div className="flex flex-col text-left">
                      <p className="text-white text-sm font-semibold">
                        {country?.name} -
                        {" "}
                        <span className="text-gray-400">{country?.code}</span>
                      </p>
                      <div className="flex flex-col text-white text-xs font-normal text-gray-500 break-all">
                        {country?.capital}
                        <p>{country?.languages?.map(lang => lang.name).join(" ")} - {country?.currency} - +{country?.phone} </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            )) }
          </div>
          
          <button
            className="block mx-auto p-3 bg-[#6265ee] text-white rounded-full cursor-pointer"
            onClick={showAll ? handleCloseAll : handleSeeAll}
          >
            {loadingMore ? "Loading..." : showAll ? "Close" : "See All Countries"}
          </button>
        </div>
      </div>

        {/*Chat Box AI  */}
        <ChatBox/>
   </>
  )
};

export default CountryList;