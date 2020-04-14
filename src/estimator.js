const normalizePeriod = (periodType, timeToElapse) => {
  let periodTypeInDays = 0;
  const periodTypeLower = periodType.toLowerCase();
  if (periodTypeLower === 'days' || periodTypeLower === 'day') {
    periodTypeInDays = 1;
  }
  if (periodTypeLower === 'weeks' || periodTypeLower === 'week') {
    periodTypeInDays = 7;
  }
  if (periodTypeLower === 'months' || periodTypeLower === 'month') {
    periodTypeInDays = 30;
  }
  return periodTypeInDays * timeToElapse;
};

const estimationHelper = (data, infectedPeople) => {
  const {
    reportedCases,
    periodType, timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomePopulation, avgDailyIncomeInUSD }
  } = data;
  const currentlyInfected = reportedCases * infectedPeople;
  const periodNormalized = normalizePeriod(periodType, timeToElapse);
  const infectedPeriod = Math.trunc(periodNormalized / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** infectedPeriod);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  const hospitalBedsByRequestedTime = (0.35 * totalHospitalBeds) - severeCasesByRequestedTime;
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestTime = 0.02 * infectionsByRequestedTime;
  const dollarsInFlight = Math.trunc(infectionsByRequestedTime
    * avgDailyIncomePopulation
    * avgDailyIncomeInUSD * periodNormalized);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestTime,
    dollarsInFlight
  };
};
const covid19ImpactEstimator = (data) => {
  const impact = estimationHelper(data, '10');
  const severeImpact = estimationHelper(data, '50');
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
