export type Optional<T> = T | null;
export interface Launch {
  id: string;
  name: string;
  details: string;
  success: boolean;
  upcoming: boolean;
  date_utc: string;
  failures: Array<any>;
  links: {
    patch: { large: string; small: string };
  };
}
export interface LaunchesData {
  page: number;
  totalPages: number;
  nextPage: Optional<number>;
  prevPage: Optional<number>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
  docs: Launch[];
}
