const form = document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    let countryName = document.querySelector("#countryName").value;
    const output = document.querySelector("output");
    // request that weather API
    fetch(`http://api.weatherstack.com/current?access_key=730a6eb3b9d142604533bb11dd5b92e9&query=${countryName}`)
        .then(response => response.json())
        // if we get a successful response
        .then(data => {
            console.log(data.current.temperature);
            const currentTemp = data.current.temperature;
            const countryTemp = document.createElement("p");
            currentTemp > 26 ? countryTemp.classList = "red" : currentTemp < 18 ? countryTemp.classList = "blue" : countryTemp.classList = "green";
            countryTemp.textContent = currentTemp;
            output.innerText = "";
            output.appendChild(countryTemp);
            let gifff = "";
            currentTemp > 26 ? gifff += "sunny-spongebob" : currentTemp < 18 ? gifff += "spongebob-cold" : gifff += "spongebob-squarepants-cool";
            fetch(`https://api.giphy.com/v1/gifs/search?q=${gifff}&api_key=VpB6lWNfDsBn0Uga89dGm8dBo50CCXxG`)
                .then(res => res.json())
                .then(dataGiph => {
                    const currentGiph = dataGiph.data[0].images.original.url;
                    const img = document.createElement("img");
                    img.src = currentGiph;
                    let divGiph = document.getElementById("giph")
                    divGiph.innerText = "";
                    divGiph.appendChild(img)
                    console.log(currentGiph);
                })
        })
        .catch(error => {
            console.error(error);
            if (error.message === "404") {
                output.textContent = ` Couldn't find "${countryName}"`
            } else {
                output.textContent = "Something went wrong"
            }
        })
})