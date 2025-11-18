"use client"

import Chart from '@/components/Chart';
import { useEffect, useState } from 'react';

export default function Home(){
  const [quarterly,setQuarterly] = useState([])
  const [sentiment,setSentiment] = useState([])
  const [stock,setStock] = useState("")
  const [news,setNews] = useState([])
  const [loading,setLoading] = useState(true)
  const [stockName,setStockName] = useState("")
  useEffect(()=>{
    async function getNews(){
      setLoading(true)
      const data = await fetch("/api/news");
      const useable_data = await data.json();
      setNews(useable_data)
      setLoading(false)
    }
    getNews()
  },[])
  async function getData(){
    setLoading(true)
    setStockName(stock)
    const quarterlyData = await fetch("/api/quarterly",{
      method:"POST",
      body:JSON.stringify({stock:stock})
    });
    const useableQuarterlyData = await quarterlyData.json();
    setQuarterly(useableQuarterlyData)

    const quarterlySentiment = await fetch("/api/sentiment",{
      method:"POST",
      body:JSON.stringify({stock:stock})
    });
    const useableQuarterlySentiment = await quarterlySentiment.json();
    setSentiment(useableQuarterlySentiment)

    const companyNews = await fetch("/api/companyNews",{
      method:"POST",
      body:JSON.stringify({stock:stock})
    });
    const usableCompanyNews = await companyNews.json();
    setNews(usableCompanyNews)
    setLoading(false)
  }
  function handleChange(event){
    setStock(event.target.value)
  }
  function handleKey(event){
    if (event.key==="Enter"){
      getData()
    }
  }
  return (
    <>
    {!loading?
    <div className='flex flex-col gap-4 px-16 lg:px-24 py-8 items-center justify-center'>
      <>
      <div className='flex flex-col items-center justify-center gap-8 w-full'>
        <div className='flex flex-col items-center text-center gap-4 h-[40vh] justify-center'>
          <h1 className='font-bold text-3xl text-white'>Search For A Stock To Analyze</h1>
          <p className='text-white'>See stock prices, news, financials, forecasts, charts and more with just a stock symbol.</p>
          <input onKeyDown={handleKey} onChange={handleChange} value={stock} placeholder='Search for a stock symbol' className='text-white border border-white rounded-lg w-1/2 h-12 p-4'/>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 h-full w-full'>
          {quarterly.length > 0?
          <Chart data={quarterly} dataKeys={["quarter","actual"]} labelValues={["Quarter #","Earning Per Share"]}/>
          :
          null
          }
          {sentiment.length > 0?
          <Chart data={sentiment} dataKeys={["month","mspr"]} labelValues={["Month","Insider Sentiment"]}/>
          :
          null
          }
        </div>
        <div className='py-4 flex flex-col gap-4 items-center'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {news.map((current,index)=>{
              return (
              current.image!=="https://static2.finnhub.io/file/publicdatany/finnhubimage/market_watch_logo.png" && index>news.length-20?
              <a key={index} href={current.url} target="_blank" className='flex items-center gap-4 hover:scale-101 border border-white transition duration-500 rounded-lg'>
                <img src={current.image} className='h-24 rounded-l-lg'/>
                <p className='text-white font-bold p-4'>{current.headline}</p>
              </a>
              :
              null
              )
            })}
          </div>
          {news.length<1?<p className='text-white text-lg'>No Data On That Stock Symbol</p>:null}
        </div>
    </div>
    </>
    </div>
    :
    <div className='flex flex-col justify-center h-[100vh] items-center w-full'>
      <div className='w-20 h-20 bg-primary animate-ping rounded-full'></div>
    </div>
  }
  </>
  )
}