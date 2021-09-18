let confirmed_cases = [];
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const country = urlParams.get('country');


function confirmed_data() {

    fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=confirmed`).then(response => {
        return response.json()
    }).then(data => {
        for (let i = 0; i <= 29; i++) {
            confirmed_cases.push(Object.values(data.All.dates)[i]); // console.log(confirmed_cases[i]);
            lasted_confirmed = confirmed_cases[i];
            // console.log(lasted_confirmed)
        }
    });

}

confirmed_data()
let recovered_cases = [];
let chart_duration = [];


function recovered_data() {

    fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=recovered`).then(response => {
        return response.json()
    }).then(data => {
        for (let i = 0; i <= 29; i++) {
            recovered_cases.push(Object.values(data.All.dates)[i])
            chart_duration.push(Object.keys(data.All.dates)[i])
                // console.log(chart_duration)

        }
    });
}
recovered_data()

let death_cases = [];
let country_image = document.getElementById('country_image');

function death_data() {


    fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=deaths`).then(response => {
        return response.json()
    }).then(data => {

        country_num_pop.innerHTML = `${data.All.population.toLocaleString()}`;
        let abbreviation = data.All.abbreviation;
        console.log(abbreviation)
        country_image.src = `https://lipis.github.io/flag-icon-css/flags/4x3/${abbreviation.toLowerCase()}.svg`
            // console.log(data.All.population)
        for (let i = 0; i <= 29; i++) {
            death_cases.push(Object.values(data.All.dates)[i])
        }
    });
}
death_data()
let ctx = document.getElementById('myChart').getContext('2d');


let myChart = new Chart(ctx, {

    type: 'line',
    data: {
        labels: chart_duration,
        datasets: [{
                label: 'Total Cases',
                data: confirmed_cases,
                backgroundColor: 'transparent',
                borderColor: '#BCBCBC',

                ActiveDataPoint: true,
                hoverBorderWidth: 6,
                borderWidth: 4,
                radius: 0.5,
            },
            {
                label: 'Recovered',
                data: recovered_cases,
                backgroundColor: 'transparent',
                borderColor: 'green',
                borderWidth: 3,
                radius: 0.5,

            },
            {
                label: 'Deaths',
                data: death_cases,
                backgroundColor: 'transparent',
                borderColor: 'red',
                borderWidth: 3,
                radius: 0.5,
            },

        ],

    },
    options: {
        hover: {
            mode: 'dataset',
            intersect: true,
        },
        responsive: true,
        maintainAspectRatio: true,

        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        const valueLegend = this.getLabelForValue(value);
                        const valueLegendReq = valueLegend.replaceAll(',', '');
                        if (valueLegendReq.length === 1) {
                            return valueLegendReq;
                        }
                        if (valueLegendReq.length === 6) {
                            return valueLegendReq.substr(0, 1) + 'M';

                        }

                        if (valueLegendReq.length === 7) {
                            return valueLegendReq.substr(0, 1) + 'M';
                        }
                    }
                }

            },
            x: {
                ticks: {
                    maxTicksLimit: 3,
                }
            }
        },
        plugins: {
            legend: {
                display: false,

            }
        },
    },

    layout: {
        padding: '1%'
    },

});
document.getElementById('total').style.backgroundColor = myChart.data.datasets[0].borderColor;
document.getElementById('recovered').style.backgroundColor = myChart.data.datasets[1].borderColor;
document.getElementById('deaths').style.backgroundColor = myChart.data.datasets[2].borderColor;





let active = 0;
let deaths = 0;
let recovered = 0;
let totalcases = 0;
let deathsPerOneMillion = 0;
let casesPerOneMillion = 0;
let critical = 0;
let population = 0;



function getCountries() {
    fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
        .then((res) => res.json())
        .then((data) => {
            country_name.innerHTML = `${data.country}`


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

function toggleData(value) {
    const visibilityData = myChart.isDatasetVisible(value);
    if (visibilityData === true) {
        myChart.hide(value);

    }
    if (visibilityData === false) {
        myChart.show(value);

    }

}
toggleData()