
const covid19ImpactEstimator = (data) => {
  const {
    periodTypes,
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

  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );


  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
