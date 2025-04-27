// Helper function to check if a status code is successful (2xx)
export const isSuccessStatus = (status: number): boolean => {
  return status >= 200 && status < 300;
};
