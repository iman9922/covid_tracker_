let confirmed_cases = [];

function confirmed_data() {
    fetch('https://covid-api.mmediagroup.fr/v1/history?country=Global&status=Confirmed').then(response => {
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
    fetch('https://covid-api.mmediagroup.fr/v1/history?country=Global&status=recovered').then(response => {
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

function death_data() {
    fetch('https://covid-api.mmediagroup.fr/v1/history?country=Global&status=Deaths').then(response => {
        return response.json()
    }).then(data => {
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
                        if (valueLegendReq.length === 8) {
                            return valueLegendReq.substr(0, 2) + 'M';
                        }
                        if (valueLegendReq.length === 7) {
                            return valueLegendReq.substr(0, 1) + 'M';
                        }
                        if (valueLegendReq.length === 9) {
                            return valueLegendReq.substr(0, 3) + 'M';
                        }
                        if (valueLegendReq.length === 10) {
                            return valueLegendReq.substr(0, 4) + 'M';
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