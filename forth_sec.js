let cases1 = [];
let countries = [];
let flags = [];
let casesPercentage = [];
fetch(
        `https://corona.lmao.ninja/v2/countries?sort=cases`
    )
    .then((res) => res.json())
    .then((data) => {

        totalcases = Object.values(data);
        const { cases, country, flag, casesPerOneMillion } = totalcases[0];
        let firstAffected = totalcases[0];
        let secondAffected = totalcases[1];
        let thirdAffected = totalcases[2];
        let fourthAffected = totalcases[3];
        cases1.push(firstAffected.cases, secondAffected.cases, thirdAffected.cases,
            fourthAffected.cases);
        //  console.log(cases1);
        countries.push(firstAffected.country, secondAffected.country, thirdAffected.country,
            fourthAffected.country);
        // console.log(countries);
        flags.push(firstAffected.countryInfo.flag, secondAffected.countryInfo.flag, thirdAffected.countryInfo.flag,
            fourthAffected.countryInfo.flag);
        //console.log(flags);
        casesPercentage.push(firstAffected.casesPerOneMillion, secondAffected.casesPerOneMillion, thirdAffected.casesPerOneMillion,
            fourthAffected.casesPerOneMillion);
        //console.log(casesPercentage);
        renderMostCases(flags, countries, cases1, casesPercentage);
    })
async function renderMostCases(flags, countries, cases1, casesPercentage) {
    let forthSection = document.querySelector('.forthsection');
    forthSection.innerHTML = (`
    <div class="first_country ">
<h1><img  src="${flags[0]} " class="forth_images"> ${countries[0]}</h1>
<p><span class="span1 "> CASES </span></p>
        <p><span class="nums_cases "> ${cases1[0].toLocaleString()} </span></p>
        <p class="span1"> Cases Per Million <br><br><span class="nums_cases ">${casesPercentage[0].toLocaleString()}</span> </p>
    </div>
    <div class="second_country ">
        <h1><img   src="${flags[1]} " class="forth_images"> ${countries[1]}</h1>
        <p><span class="span1 "> CASES </span></p>
      <p><span class="nums_cases "> ${cases1[1].toLocaleString()} </span></p>
        <p class="span1">Cases Per Million <br><br><span class="nums_cases ">${casesPercentage[1].toLocaleString()}</span> </p>
    </div>
    <div class="third_country ">
        <h1><img  src="${flags[2]} " class="forth_images"> ${countries[2]}</h1>
        <p><span class="span1 "> CASES </span></p>
        <p><span class="nums_cases "> ${cases1[2].toLocaleString()} </span></p>
        <p class="span1">Cases Per Million <br><br><span class="nums_cases ">${casesPercentage[2].toLocaleString()}</span> </p>
    </div>
    <div class="forth_country ">
        <h1><img   src="${flags[3]} " class="forth_images"> ${countries[3]}</h1>
        <p><span class="span1 "> CASES </span></p>
        <p><span class="nums_cases "> ${cases1[3].toLocaleString()}</span></p>
        <p class="span1">Cases Per Million <br><br><span class="nums_cases ">${casesPercentage[3].toLocaleString()}</span> </p>
    </div>

 `)
}