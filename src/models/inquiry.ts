import { useCountriesStore } from "@/stores/countries";
import type { Country } from "./country";

export enum InquiryType {
  BUY = "BUY",
  SELL = "SELL",
  RENT = "RENT",
}

export class InquiryBuilder {
  public country?: Country;
  public type: InquiryType = InquiryType.RENT;
  public homeBudget?: number;
  public homeValue?: number;
  public name?: string;
  public email?: string;
  public city?: string;
  public financingAdvisory?: boolean;

  public addCountry(countryName?: string): this {
    const countriesStore = useCountriesStore();
    const country = countriesStore.countries?.find(
      (country: Country) => country.name == countryName
    );

    if (country) {
      this.country = country;
    }
    return this;
  }

  public addInquiryType(inquiryType: InquiryType): this {
    this.type = inquiryType;
    return this;
  }

  public addHomeBudget(homeBudget?: number) {
    this.homeBudget = homeBudget;
    return this;
  }

  public addHomeValue(homeValue?: number) {
    this.homeValue = homeValue;
    return this;
  }

  public addFinancingAdvisory(financingAdvisory: boolean) {
    this.financingAdvisory = financingAdvisory;
    return this;
  }

  public addName(name?: string ): this {
    this.name = name;
    return this;
  }

  public addEmail(email?: string): this {
    this.email = email;
    return this;
  }

  public addCity(city?: string): this {
    this.city = city;
    return this;
  }

  public build(): Inquiry {
    if (this.type) {
      switch (this.type) {
        case InquiryType.BUY:
          return new BuyInquiry(this);
        case InquiryType.RENT:
          return new RentInquiry(this);
        case InquiryType.SELL:
          return new SellInquiry(this);
        default:
          throw new Error("Builder failed due to missing inquiry type");
      }
    }
    throw new Error("Builder failed due to missing arguments");
  }

  public reset() {
    this.country = undefined;
    this.type = InquiryType.RENT;
    this.homeBudget = undefined;
    this.homeValue = undefined;
    this.name = undefined;
    this.email = undefined;
    this.city = undefined;
    this.financingAdvisory = undefined;
  }
}

// ---------------- Classes ---------------- //
export abstract class Inquiry {
  public country: Country;
  public type: InquiryType;
  public name: string;
  public email: string;
  public city: string;

  constructor(builder: InquiryBuilder) {
    this.country = builder.country!;
    this.type = builder.type!;
    this.name = builder.name!;
    this.email = builder.email!;
    this.city = builder.city!;
  }
}

export class SellInquiry extends Inquiry {
  public homeValue: number;

  constructor(builder: InquiryBuilder) {
    super(builder);
    this.homeValue = builder.homeValue!;
  }
}

export class RentInquiry extends Inquiry {
  public homeBudget: number;

  constructor(builder: InquiryBuilder) {
    super(builder);
    this.homeBudget = builder.homeBudget!;
  }
}

export class BuyInquiry extends Inquiry {
  public homeBudget: number;
  public financingAdvisory: boolean;

  constructor(builder: InquiryBuilder) {
    super(builder);
    this.homeBudget = builder.homeBudget!;
    this.financingAdvisory = builder.financingAdvisory!;
  }
}
