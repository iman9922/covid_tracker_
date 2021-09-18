let information = {};
let info = {};
let active = 0;
let deaths = 0;
let recovered = 0;
let totalcases = 0;
let deathsPerOneMillion = 0;
let casesPerOneMillion = 0;
let critical = 0;
let population = 0;
let nums_affected_countries = 0;
let header_number = document.getElementById('num_affected');

function getCountries() {
    fetch(
            `https://coronavirus-19-api.herokuapp.com/countries`
        )
        .then((res) => res.json())
        .then((data) => {
            //console.log(data)
            header_number.innerHTML = `${data.length-1}`
            information = data[0];
            active = information.active;
            deaths = information.deaths;
            recovered = information.recovered;
            totalcases = information.cases;
            deathsPerOneMillion = information.deathsPerOneMillion;
            todayCases = information.todayCases;
            casesPerOneMillion = information.casesPerOneMillion;
            critical = information.critical;
            renderAffectedCountries();

        });
}
getCountries();

async function renderAffectedCountries() {
    document.querySelector(".firstSection").insertAdjacentHTML("afterbegin", `<div class="totalCases">
    <i class=" fas fa-globe-americas theme--dark" style="color: #bcbcbc;"></i>
    <h4>Total cases</h4>
    <p><span class=" span1 ">${ totalcases.toLocaleString()}</span><span class="span2 ">+ ${ todayCases.toLocaleString()} </span></p>
    <p><span class="span3 ">${casesPerOneMillion.toLocaleString()} per million .</span>
        <span class="span4 ">165,2558 tested</span></p>
</div>
<div class="activeCases ">
    <i class="fas fa-head-side-mask " style="color: #3b81f7; "></i>
    <h4>Active cases</h4>
    <p><span class="span1 ">${active.toLocaleString()}</span><span class="span5 "> -13,854 </span></p>
    <p><span class="span3 ">${critical.toLocaleString()} in critical conditions</span></p>
</div>
<div class="recovered ">
    <i class="fas fa-heart " style="color: green; "></i>
    <h4>Recovered</h4>
    <p><span class="span1 ">${recovered.toLocaleString()} </span><span style="color: green; ">+117,080</span>
        <br><br><span class="span5 ">   ${parseInt(100*recovered/totalcases)}% recovered </span></p>
</div>
<div class="deaths ">
    <i class="fas fa-skull-crossbones " style="color:#ff1e4a ; "></i>
    <h4>Deaths</h4>
    <p><span class="span1 ">${deaths.toLocaleString()}</span><span class="span2 "> +545,985 </span></p>
    <p><span class="span3 ">${deathsPerOneMillion.toLocaleString()} Per million.</span></p>
</div>`)


}