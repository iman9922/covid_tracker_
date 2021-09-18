let number = 10;
const table = document.querySelector("table");
let start_point = 0;

let myTableTH = table.innerHTML;
let selecting = document.querySelector(".select");

function getting_numbers() {
    selecting.addEventListener("change", function(event) {
        event.preventDefault();
        let show_nums = document.querySelector(".show_nums");
        show_nums.innerHTML = selecting.value;

        if (selecting.value == 10) {
            number = selecting.value;
        } else if (selecting.value == 20) {
            number = selecting.value;
        } else if (selecting.value == 50) {
            number = selecting.value;
        }
        start_point = 0;
        table_information(number)


    })
}

function handleControle(data, filteredCountries) {
    let left_i = document.getElementById('left_i');
    left_i.addEventListener("click", function(event) {
        if (start_point > number - 1) {
            start_point -= number - 1;
            listItems(data, filteredCountries);
        }
    })
    let right_i = document.getElementById('right_i');
    right_i.addEventListener("click", function(event) {
        if (start_point < filteredCountries.length) {
            start_point += number - 1;
            listItems(data, filteredCountries);
        }

    })
}
getting_numbers()

function table_information(number) {
    Promise.all([
        fetch('https://covid-api.mmediagroup.fr/v1/vaccines'),
        fetch('https://covid-api.mmediagroup.fr/v1/cases')
    ]).then(function(responses) {
        return Promise.all(responses.map(function(response) {

            return response.json();
        }));
    }).then(function(data) {
        // console.log(data);
        const [vaccination, cases] = data;
        const countries = Object.keys(vaccination);
        listItems(data, countries, number);
        searching_function(countries, data);


    })
}

function listItems(data, filteredCountries, num = number) {
    const [vaccination, cases] = data;
    const countries = filteredCountries;
    table.innerHTML = myTableTH;
    for (let i = start_point; i < start_point + number; i++) {
        const { abbreviation, administered, country, people_partially_vaccinated, people_vaccinated, population } = vaccination[countries[i]].All;
        const { confirmed, deaths } = cases[countries[i]].All;
        const valid_data = [abbreviation, administered, country, people_partially_vaccinated, people_vaccinated, population, confirmed, deaths].map(info => info ? info : "-")
        table_data(...valid_data);
        // searching_function(searching_data)
    }
}
let RECOVERD = [];
let DEATH_MILION = [];



function table_data(abbreviation, administered, country, people_partially_vaccinated, people_vaccinated, population, confirmed, deaths) {

    //table.insertAdjacentHTML = "";
    table.insertAdjacentHTML("beforeend", `
    
   
<tr class="table_rows" onclick="goSite('${country}')">
<td><img class="flags"src="https://lipis.github.io/flag-icon-css/flags/4x3/${abbreviation.toLowerCase()}.svg"><span class="country_name">${country}</span></td>
<td>${population.toLocaleString()}</td>
<td>${confirmed.toLocaleString()}</td>
<td>${RECOVERD}</td>
<td>${deaths}</td>
<td>${DEATH_MILION }</td>
<td>${administered.toLocaleString()}</td>
<td>${people_partially_vaccinated.toLocaleString() }</td>
<td>${people_vaccinated.toLocaleString()}</td>
</tr>
`)

}

function goSite(country) {
    window.location.href = window.location.origin + '/country_details.html?country=' + country;
}
table_information(number)

function searching_function(countries, data) {
    let input, filter;
    let filteredCountries = countries;
    input = document.getElementById('myInput');
    input.addEventListener("keyup", () => {
        filter = input.value.toUpperCase();
        if (filter === "") {
            filteredCountries = countries;
        } else {
            filteredCountries = countries.filter((country) => country.toUpperCase().includes(filter));

        }
        listItems(data, filteredCountries)
    })
    handleControle(data, filteredCountries);
}