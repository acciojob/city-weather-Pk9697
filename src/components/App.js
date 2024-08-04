import React, { useEffect, useState } from 'react'
import './../styles/App.css'

const API_KEY = '91a2fdcc0f42dd6dc9e4e6788efd8a02'

const App = () => {
	const [searchText, setSearchText] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const callApi = () => {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}`
			fetch(url)
				.then((res) => res.json())
        .then((data) => {
          console.log(data)
					if (data.cod == '200') {
						setWeatherData(data)
						setSearchText('')
						setError(null)
					} else {
						setWeatherData(null)
						setError(data.message)
					}
				})
    }
    
    searchText && callApi()
	}, [searchText])

	return (
		<div>
			{/* Do not remove the main div */}
			<input
				type='search'
				className='search'
				placeholder='Enter a city'
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			{weatherData && (
				<div className='weather'>
					<h1>{weatherData.name}</h1>
					<h1>{weatherData.main.temp} F</h1>
					<h2>{weatherData.weather[0].main}</h2>
					<img
						src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
					/>
				</div>
			)}
			{error && <p className='error'>{error}</p>}
		</div>
	)
}

export default App
