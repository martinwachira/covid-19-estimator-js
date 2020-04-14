// currently Infected function
const estimateCurrentlyInfected = (impact, data) => {
  const currentlyInfected = Math.trunc(data.reportedCases * impact);
  return currentlyInfected;
};

// infections By Requested Time function
const infectionByRequestTime = (data, currentlyInfected) => {
  let time = '';
  let infectionBRT = '';
  // for days
  if (data.periodType.toLowerCase() === 'days') {
    time = Math.trunc((data.timeToElapse * 1) / 3);
  }
  // for weeks
  if (data.periodType.toLowerCase() === 'weeks') {
    time = Math.trunc((data.timeToElapse * 7) / 3);
  }
  // months
  if (data.periodType.toLowerCase() === 'months') {
    time = Math.trunc((data.timeToElapse * 30) / 3);
  }

  infectionBRT = Math.trunc(currentlyInfected * (2 ** time));
  return infectionBRT;
};

// Severe cases by Requested Time Function
const estSevereCasesBRT = (infectionByRT) => {
  const estSevereCasesByRT = Math.trunc(infectionByRT * (15 / 100));
  return estSevereCasesByRT;
};

// Total Hospital beds By requested time function
const estHospitalBRT = (data, severeCasesByRequestTime) => {
  const hospitalBRT = Math.trunc((data.totalHospitalBeds * (35 / 100)) - severeCasesByRequestTime);
  return hospitalBRT;
};

// cases for ICU by requested time function
const estimateCasesForICUByRequestedTime = (data, currentlyInfected) => {
  const infectionRT = infectionByRequestTime(data, currentlyInfected);
  const estCasesForICUBRT = Math.trunc(infectionRT * (5 / 100));
  return estCasesForICUBRT;
};

// Cases for ventilators by requested Time
const casesVentilatorsBRT = (data, currentlyInfected) => {
  const infectionRT = infectionByRequestTime(data, currentlyInfected);
  const casesForVentBRT = Math.trunc(infectionRT * (2 / 100));
  return casesForVentBRT;
};

// Dollars in flight
const estimateDollarsInFlight = (data, currentlyInfected) => {
  let time = '';
  // days
  if (data.periodType.toLowerCase() === 'days') {
    time = Math.trunc((data.timeToElapse * 1));
  }
  // for weeks
  if (data.periodType.toLowerCase() === 'weeks') {
    time = Math.trunc((data.timeToElapse * 7));
  }
  // months
  if (data.periodType.toLowerCase() === 'months') {
    time = Math.trunc((data.timeToElapse * 30));
  }
  const infectionRT = infectionByRequestTime(data, currentlyInfected);
  const dollarsInFlight = Math.trunc(((infectionRT * data.region.avgDailyIncomePopulation
  * data.region.avgDailyIncomeInUSD) / time));
  return dollarsInFlight;
};

const estimateImpact = (data, impact) => {
  // Challenge 1
  const currentlyInfectedR = Math.trunc(estimateCurrentlyInfected(impact, data));
  const infectionByRT = Math.trunc(infectionByRequestTime(data, currentlyInfectedR));

  // Challenge 2
  const severeCasesByRequestedTime = estSevereCasesBRT(infectionByRT);
  const hospitalBedsByRequestedTime = estHospitalBRT(data, severeCasesByRequestedTime);

  // Challenge 3
  const casesForICUByRequestedTime = estimateCasesForICUByRequestedTime(data, currentlyInfectedR);
  const casesForVentilatorsByRequestedTime = casesVentilatorsBRT(data, currentlyInfectedR);
  const dollarsInFlightForImpact = estimateDollarsInFlight(data, currentlyInfectedR);

  // Impact object
  const impactObj = {
    currentlyInfected: currentlyInfectedR,
    infectionsByRequestedTime: infectionByRT,
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(casesForVentilatorsByRequestedTime),
    dollarsInFlight: dollarsInFlightForImpact
  };
  return impactObj;
};

const covid19ImpactEstimator = (data) => {
  const impact = estimateImpact(data, 10);
  const severeImpact = estimateImpact(data, 50);
  const completeData = { data, impact, severeImpact };
  return completeData;
};

export default covid19ImpactEstimator;
