/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import covid19ImpactEstimator from './estimator.js';

const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 90,
  reportedCases: 894,
  population: 787705,
  totalHospitalBeds: 7563614
};

const periodType = document.querySelector('[data-period-type]');
const population = document.querySelector('[data-population]');
const timeToElapse = document.querySelector('[data-time-to-elapse]');
const reportedCases = document.querySelector('[data-reported-cases]');
const totalHospitalBeds = document.querySelector('[data-total-hospital-beds]');

const getInputValue = (e) => {
  if (e.target === periodType) {
    inputData.periodType = e.target.value;
  }
  if (e.target === timeToElapse) {
    inputData.timeToElapse = e.target.value;
  }
  if (e.target === reportedCases) {
    inputData.reportedCases = e.target.value;
  }
  if (e.target === population) {
    inputData.population = e.target.value;
  }
  if (e.target === totalHospitalBeds) {
    inputData.totalHospitalBeds = e.target.value;
  }
};

periodType.addEventListener('change', getInputValue);
const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
  input.addEventListener('keyup', getInputValue);
});

const renderResult = ({ impact, severeImpact }) => {
  const contImpact = document.getElementById('cont_impact');
  const contSevereImpact = document.getElementById('cont_severe_impact');

  const impactArr = Object.values(impact);
  impactArr.forEach((value, key) => {
    const pImpact = document.querySelectorAll('.est-impact');
    pImpact[key].innerHTML = value;
  });

  const severeImpactArr = Object.values(severeImpact);
  severeImpactArr.forEach((value, key) => {
    const pSevereImpact = document.querySelectorAll('.est-severe-impact');
    pSevereImpact[key].innerHTML = value;
  });
  contImpact.style.display = 'block';
  contSevereImpact.style.display = 'block';
};

const estimateBtn = document.getElementById('estimate');
estimateBtn.addEventListener('click', (e) => {
  inputs.forEach((input) => {
    if (input.value === '') {
      e.preventDefault();
    }
  });
  const estimatedResult = covid19ImpactEstimator(inputData);
  renderResult(estimatedResult);
});

window.onload = () => {
  const clearInput = document.querySelectorAll('input');
  clearInput.forEach((input) => {
    input.value = '';
  });
};
