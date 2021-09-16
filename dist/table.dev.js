"use strict";

var table_data_countries = ["Europe", "Oceania", "Africa", "Asia"];

function total(continent, administered, partiallyVaccinated, vaccinated, population) {
  document.querySelector(".thirdSection").insertAdjacentHTML("afterbegin", "\n<div class=\"continent\">\n    <h1>".concat(continent, "</h1>\n    <h4>\n        Total Population:\n        <p>").concat(population.toLocaleString(), "</p>\n    </h4>\n    <h4>\n        Total Administered:\n        <p>").concat(administered.toLocaleString(), "</p>\n    </h4>\n    <h4>\n        Total Partially Vaccinated:\n        <p>").concat(partiallyVaccinated.toLocaleString(), "</p>\n    </h4>\n    <h4>\n        Total Vaccinated:\n        <p>").concat(vaccinated.toLocaleString(), "</p>\n    </h4>\n</div>\n"));
}

function getData() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var continent = _step.value;
      fetch("https://covid-api.mmediagroup.fr/v1/vaccines?continent=".concat(continent)).then(function (response) {
        return response.json();
      }).then(function (apiData) {
        var values = Object.values(apiData);
        var administered = 0;
        var partiallyVaccinated = 0;
        var vaccinated = 0;
        var population = 0;

        for (var key in values) {
          administered += values[key].All.administered;
          partiallyVaccinated += values[key].All.people_partially_vaccinated;
          vaccinated += values[key].All.people_vaccinated;
          population += values[key].All.population;
        }

        total(continent, administered, partiallyVaccinated, vaccinated, population);
      });
    };

    for (var _iterator = continents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

getData();