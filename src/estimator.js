
const covid19ImpactEstimator = (data) => {
  const {
    periodTypes,
    timeToElapse,
    reportedCases
  } = data;

  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  let time;

  switch (periodTypes) {
    case 'Months':
      time = Math.trunc((timeToElapse * 30) / 3);
      break;
    case 'Weeks':
      time = Math.trunc((timeToElapse * 7) / 3);
      break;
    case 'Days':
      time = Math.trunc((timeToElapse) / 3);
      break;
    default:
  }

  //   if (periodTypes === 'Days') {
  //     time = Math.trunc(timeToElapse / 3);
  //   } else if (periodTypes === 'Weeks') {
  //     time = Math.trunc((timeToElapse * 7) / 3);
  //   } else if (periodTypes === 'Months') {
  //     time = Math.trunc((timeToElapse * 30) / 3);
  //   }

  impact.infectionsByRequesteTime = impact.currentlyInfected * (2 ** time);
  severeImpact.infectionsByRequesteTime = severeImpact.currentlyInfected * (2 ** time);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
