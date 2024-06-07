  "use strict"

        window.onload = () => {

            // get a hold of this so we can use it later
            let citiesDDL = document.getElementById("citiesDDL");

            //get that dropdown populated
            populateDDL(citiesDDL, cities);

            //add an event listener to the DDL so when it changes we can kick things off
            citiesDDL.addEventListener("change", displayWeatherData )

        }

        async function displayWeatherData(event){

            //search the cities array to find the matching city object
            let selectedCity = cities.find((city)=>{
                return city.name === event.target.value;
            })

            //get the lat and lng from the selected city in the format to make the API call
            let latLongString = `${selectedCity.latitude},${selectedCity.longitude}`;

            //get the weather data
            let weatherData = await getWeatherData(latLongString);

            //get the forecast url from the weather data and call the api again for the forecast
            let forecast = await getForecastData(weatherData.properties.forecast);
            
            //put the data in the table
            populateTable(forecast.properties.periods)

        }

        function populateTable(forecastArray){
          
            let tableBody = document.getElementById("tableResults");
            tableBody.innerHTML = "";
        
            for(let i=0; i<forecastArray.length; i++) {
        
                let row = tableBody.insertRow();
                
                let cell1 = row.insertCell(0);
                cell1.innerHTML = forecastArray[i].name;
                
                let cell2 = row.insertCell(1);
                cell2.innerHTML= forecastArray[i].temperature + " " +
                forecastArray[i].temperatureUnit;
                
                let cell3 = row.insertCell(2);
                cell3.innerHTML = forecastArray[i].windDirection + " " +
                forecastArray[i].windSpeed;
                
                let cell4 = row.insertCell(3);
                cell4.innerHTML = forecastArray[i].shortForecast;
            
                
                }
                console.log(forecastArray);
            
        }
        async function getForecastData(forecastURL){
            try{
            let response = await fetch(forecastURL);
            let data = await response.json()

            return data;
            }catch(error){
                console.log(error)
            }
        }

        async function getWeatherData(latLongString){

            let response = await fetch(`https://api.weather.gov/points/${latLongString}`);
            let data = await response.json()

            return data;
            

        }


        function populateDDL(drowpdownToPopulate, data) {

            let defaultOption = document.createElement("option");
            defaultOption.textContent = "Select a Option";
            defaultOption.value = ""

            drowpdownToPopulate.appendChild(defaultOption);

            data.forEach((optionData) => {

                let newOption = document.createElement("option");
                newOption.textContent = optionData.name;
                newOption.value = optionData.name;
                drowpdownToPopulate.appendChild(newOption);

            })

        }





