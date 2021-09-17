let active = 0;
let deaths = 0;
let recovered = 0;
let totalcases = 0;
let deathsPerOneMillion = 0;
let casesPerOneMillion = 0;
let critical = 0;
let population = 0;
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const country = urlParams.get('country');
let country_name = document.getElementById('country_name');
//let country_num_pop = document.getElementById('country_num_pop');

function getCountries() {
    fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
        .then((res) => res.json())
        .then((data) => {
            country_name.innerHTML = `${data.country}`
                //country_num_pop.innerHTML = `${data.population}`

            active = data.active;
            console.log(data);
            deaths = data.deaths;
            recovered = data.recovered;
            totalcases = data.cases;
            deathsPerOneMillion = data.deathsPerOneMillion;
            casesPerOneMillion = data.casesPerOneMillion;
            critical = data.critical;
            console.log(active, totalcases, deaths, recovered);
            renderAffectedCountries(data);

        });
}
getCountries();

async function renderAffectedCountries() {
    document.querySelector(".firstSection").innerHTML = `<div class="totalCases">
       <i class=" fas fa-globe-americas theme--dark" style="color: #bcbcbc;"></i>
    <h4>Total cases</h4>
    <p><span class=" span1 ">${ totalcases.toLocaleString()}</span></p>
    <p><span class="span3 ">${casesPerOneMillion.toLocaleString()} per million .</span>
    </p>
</div>
<div class="activeCases ">
    <i class="fas fa-head-side-mask " style="color: #3b81f7; "></i>
    <h4>Active cases</h4>
    <p><span class="span1 ">${active.toLocaleString()}</span></p>
    <p><span class="span3 ">${critical.toLocaleString()} in critical conditions</span></p>
</div>
<div class="recovered ">
    <i class="fas fa-heart " style="color: green; "></i>
    <h4>Recovered</h4>
    <p><span class="span1 ">${recovered.toLocaleString()} </span>
        <br><br><span class="span5 ">   ${parseInt(100*recovered/totalcases)}% recovered </span></p>
</div>
<div class="deaths ">
    <i class="fas fa-skull-crossbones " style="color:#ff1e4a ; "></i>
    <h4>Deaths</h4>
    <p><span class="span1 ">${deaths.toLocaleString()}</span></p>
    <p><span class="span3 ">${deathsPerOneMillion.toLocaleString()} Per million.</span></p>
</div>`
}