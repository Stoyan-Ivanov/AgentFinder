import type { Country } from "@/models/country";

const baseUrl = "https://restcountries.com/v3.1";
const headers = { "Content-Type": "application/json" };

export default {
  /**
   * 🚀 Fetches the countries' data and transforms it
   * @returns an array of formatted countries ({@link Country})
   */
  async getCountries(): Promise<Country[]> {
    const response = await fetch(`${baseUrl}/all`, { method: "GET", headers });
    const data: any[] = await response.json();

    let formattedCountries = data
      .filter((rawCountry: any) => {
        return rawCountry.currencies;
      })
      .map<Country>((rawCountry: any) => {
        const currencyName = Object.keys(rawCountry.currencies)[0];
        return {
          name: rawCountry.name.common,
          flagUrl: rawCountry.flags.svg,
          currencyName: currencyName,
          currencySymbol: rawCountry.currencies[currencyName].symbol,
        };
      });

    return formattedCountries.sort((a: Country, b: Country) =>
      a.name.localeCompare(b.name)
    );
  },
};
