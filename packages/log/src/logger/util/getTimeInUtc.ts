const getTimeInUtc = (): string => {
  return new Date().toISOString();
};

export default getTimeInUtc;
