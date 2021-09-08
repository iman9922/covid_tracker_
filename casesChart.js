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

function myChart() {
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
                    borderWidth: 3
                },
                {
                    label: 'Recovered',
                    data: recovered_cases,
                    backgroundColor: 'transparent',
                    borderColor: 'green',
                    borderWidth: 3
                },
                {
                    label: 'Deaths',
                    data: death_cases,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 3
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,

            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
myChart()