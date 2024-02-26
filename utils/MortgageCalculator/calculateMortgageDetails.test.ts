import { calculateMortgageDetails } from "./calculateMortgageDetails";

describe("calculateMortgageDetails", () => {
  it("should calculate the correct monthly payment with interest", () => {
    const propertyPrice = 100000;
    const deposit = 5000;
    const interestRate = 5.25;
    const mortgageTermInYears = 15;
    const expectedRemainingDebtPerYear = [
      { year: 0, remainingBalance: 95000 },
      { year: 1, remainingBalance: 90721 },
      { year: 2, remainingBalance: 86213 },
      { year: 3, remainingBalance: 81461 },
      { year: 4, remainingBalance: 76454 },
      { year: 5, remainingBalance: 71178 },
      { year: 6, remainingBalance: 65618 },
      { year: 7, remainingBalance: 59760 },
      { year: 8, remainingBalance: 53586 },
      { year: 9, remainingBalance: 47079 },
      { year: 10, remainingBalance: 40224 },
      { year: 11, remainingBalance: 32999 },
      { year: 12, remainingBalance: 25386 },
      { year: 13, remainingBalance: 17363 },
      { year: 14, remainingBalance: 8909 },
      { year: 15, remainingBalance: 0 }
    ];
    const { monthlyPayment, affordabilityCheck, remainingDebtPerYear, } = calculateMortgageDetails(propertyPrice, deposit, interestRate, mortgageTermInYears);

    expect(monthlyPayment).toBeCloseTo(763.68, 1);
    expect(affordabilityCheck).toBeCloseTo(921.63, 1);
    expect(remainingDebtPerYear.length).toBe(mortgageTermInYears + 1);
    expect(remainingDebtPerYear[0].remainingDebt).toBe(propertyPrice - deposit);
    expect(remainingDebtPerYear[mortgageTermInYears].remainingDebt).toBe(0);

    // Check each year's remaining debt
    expectedRemainingDebtPerYear.forEach((expected, index) => {
      expect(remainingDebtPerYear[index].year).toEqual(expected.year);
      expect(Math.round(remainingDebtPerYear[index].remainingDebt)).toBe(expected.remainingBalance);
    });

  });

  it("should calculate the correct monthly payment with interest", () => {
    const propertyPrice = 300000;
    const deposit = 60000;
    const interestRate = 3.5;
    const mortgageTermInYears = 30;
    const { monthlyPayment, affordabilityCheck, remainingDebtPerYear, } = calculateMortgageDetails(propertyPrice, deposit, interestRate, mortgageTermInYears);

    expect(monthlyPayment).toBeCloseTo(1077.71);
    expect(affordabilityCheck).toBeCloseTo(1516.96);
    expect(remainingDebtPerYear.length).toBe(mortgageTermInYears + 1);
    expect(remainingDebtPerYear[0].remainingDebt).toBe(propertyPrice - deposit);
    expect(remainingDebtPerYear[mortgageTermInYears].remainingDebt).toBe(0);
  });

  it("should calculate the correct monthly payment without interest", () => {
    const propertyPrice = 300000;
    const deposit = 60000;
    const interestRate = 0;
    const mortgageTermInYears = 30;
    const { monthlyPayment, affordabilityCheck, remainingDebtPerYear, } = calculateMortgageDetails(propertyPrice, deposit, interestRate, mortgageTermInYears);

    expect(monthlyPayment).toBeCloseTo(666.67);
    expect(affordabilityCheck).toBeCloseTo(0);
    expect(remainingDebtPerYear.length).toBe(mortgageTermInYears + 1);
    expect(remainingDebtPerYear[0].remainingDebt).toBe(propertyPrice - deposit);
    expect(remainingDebtPerYear[mortgageTermInYears].remainingDebt).toBe(0);
  });

  it("should calculate the correct monthly payment with a different term", () => {
    const propertyPrice = 300000;
    const deposit = 60000;
    const interestRate = 3.5;
    const mortgageTermInYears = 15;
    const { monthlyPayment, affordabilityCheck, remainingDebtPerYear, } = calculateMortgageDetails(propertyPrice, deposit, interestRate, mortgageTermInYears);

    expect(monthlyPayment).toBeCloseTo(1715.72);
    expect(affordabilityCheck).toBeCloseTo(2090.66);
    expect(remainingDebtPerYear.length).toBe(mortgageTermInYears + 1);
    expect(remainingDebtPerYear[0].remainingDebt).toBe(propertyPrice - deposit);
    expect(remainingDebtPerYear[mortgageTermInYears].remainingDebt).toBe(0);
  });
});
