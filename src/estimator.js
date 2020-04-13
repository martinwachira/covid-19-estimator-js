/* eslint-disable no-trailing-spaces */

const covid19ImpactEstimator = (data) => {
  const {
    region: { 
      avgDailyIncomeInUSD, 
      avgDailyIncomePopulation
    },
    totalHospitalBeds,
    periodType,
    reportedCases
  } = data;

  let { timeToElapse } = data;

  //   switch (periodType) {
  //     case 'months':
  //       timeToElapse = Math.trunc(timeToElapse * 30);
  //       break;
  //     case 'weeks':
  //       timeToElapse = Math.trunc(timeToElapse * 7);
  //       break;
  //     default:
  //   }

  // normalize days; check for weeks and months if used
  if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
  if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);
  if (periodType === 'days') timeToElapse = Math.trunc(timeToElapse * 1);

  const infectionsByRequesteTime = (currentlyInfected) => {
    const timeFactor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * (2 ** timeFactor);
  };

  const calchospitalBedsByRequestedTime = (severeCasesByRequestedTime) => {
    const availableBeds = totalHospitalBeds * 0.35;
    const bedsShort = availableBeds - severeCasesByRequestedTime;
    const totalBeds = bedsShort < 0 ? bedsShort : availableBeds;
    return Math.trunc(totalBeds);
  };

  // eslint-disable-next-line no-shadow
  const calcdollarsInFlight = (infectionsByRequesteTime) => {
    const moneyLost = infectionsByRequesteTime * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const total = moneyLost / timeToElapse;
    return Math.trunc(total);
  };

  const impact = {};
  const severeImpact = {};

  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = infectionsByRequesteTime(
    impact.currentlyInfected
  );
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = infectionsByRequesteTime(
    severeImpact.currentlyInfected
  );

  // challenge 2
  impact.severeCasesByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.15
  );
  impact.hospitalBedsByRequestedTime = calchospitalBedsByRequestedTime(
    impact.severeCasesByRequestedTime
  );

  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );
  severeImpact.hospitalBedsByRequestedTime = calchospitalBedsByRequestedTime(
    severeImpact.severeCasesByRequestedTime
  );

  // challenge 3
  impact.casesForICUByRequestedTime = Math.trunc(
    impact.infectionsByRequesteTime * 0.05
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  impact.dollarsInFlight = calcdollarsInFlight(
    impact.infectionsByRequestedTime
  );

  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequesteTime * 0.05
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.dollarsInFlight = calcdollarsInFlight(
    severeImpact.infectionsByRequestedTime
  );


  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
