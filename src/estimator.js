const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected = 0;
  const severeCasesByRequestedTime = (15 * input.infectionsByRequestedTime) / 100;
  input.infectionsByRequestedTime = currentlyInfected * 512;
  input.totalHospitalBeds = (35 * severeCasesByRequestedTime) / 100;
  return {
    data: input,
    impact: {
      infectionscurrentByRequestedTime: input.reportedCases * 10
    },
    severeImpact: {
      infectionsByRequestedTime: input.reportedCases * 50,
      severeCasesByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
