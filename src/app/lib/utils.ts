export const utcToLocaleTime = (utcDate: string): string => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  } as Intl.DateTimeFormatOptions;
  const formattedDate = new Date(utcDate).toLocaleDateString("en-US", options);
  return formattedDate;
};
