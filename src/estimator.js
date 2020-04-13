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

  if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
  if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);
  // if (periodType === 'days') timeToElapse = Math.trunc(timeToElapse * 1);

  const calcinfectionsByRequestedTime = (currentlyInfected) => {
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
  const calcdollarsInFlight = (periodType, avgIncomeperDay, avgDailyIPopulation, timeToElapse) => {
    let normDays;
    switch (periodType) {
      case 'months':
        normDays = (avgIncomeperDay * avgDailyIPopulation) / (timeToElapse * 30);
        break;
      case 'weeks':
        normDays = (avgIncomeperDay * avgDailyIPopulation) / (timeToElapse * 7);
        break;
      case ' days':
        normDays = (avgIncomeperDay * avgDailyIPopulation) / timeToElapse;
        break;
      default:
        return normDays;
    }
  };  

  const getFlight = calcdollarsInFlight(
    periodType, avgDailyIncomeInUSD, avgDailyIncomePopulation, timeToElapse
  );

  const impact = {};
  const severeImpact = {};

  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calcinfectionsByRequestedTime(
    impact.currentlyInfected
  );
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calcinfectionsByRequestedTime(
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
    impact.infectionsByRequestedTime * 0.05
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.02
  );
  impact.dollarsInFlight = Math.trunc(
    impact.infectionsByRequestedTime * getFlight
  );

  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );
  severeImpact.dollarsInFlight = Math.trunc(
    severeImpact.infectionsByRequestedTime * getFlight
  );
  
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
