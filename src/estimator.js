const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: data.reportedCases * 10
    },
    severeImpact: {}
  };
};

export default covid19ImpactEstimator;
