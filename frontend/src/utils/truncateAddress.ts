export const truncateAddress = (address: string, startLen = 4, endLen = 4) => {
  return `${address.slice(0, startLen)}...${address.slice(-endLen)}`;
};
