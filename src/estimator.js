
const covid19ImpactEstimator = (data) => {
  const {
    periodTypes,
    // timeToElapse,
    reportedCases
  } = data;

  let { timeToElapse } = data;

  // normalize days; check for weeks and months if used
  if (periodTypes === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
  if (periodTypes === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);
  // if (periodType === 'days') timeToElapse = Math.trunc(timeToElapse * 1);

  const infectionsByRequesteTime = (currentlyInfected) => {
    const timeFactor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * (2 ** timeFactor);
  };

  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = infectionsByRequesteTime(
    impact.currentlyInfected
  );
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = infectionsByRequesteTime(
    severeImpact.currentlyInfected
  );

  //   let timeFactor;

  //   switch (periodTypes) {
  //     case 'Months':
  //       timeFactor = Math.trunc(timeToElapse * 30);
  //       break;
  //     case 'Weeks':
  //       timeFactor = Math.trunc(timeToElapse * 7);
  //       break;
  //     // case 'Days':
  //     //   time = Math.trunc((timeToElapse) / 3);
  //     //   break;
  //     default:
  //   }

  //   impact.infectionsByRequesteTime = impact.currentlyInfected * (2 ** timeFactor);
  //   severeImpact.infectionsByRequesteTime = severeImpact.currentlyInfected * (2 ** timeFactor);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
