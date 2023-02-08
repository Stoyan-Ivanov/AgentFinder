import type { Country } from "./country";

export default interface PopularCountry {
  country: Country;
  occurrenceCount: number;
}