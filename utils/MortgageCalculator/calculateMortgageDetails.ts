/**
 * Calculates the monthly mortgage payment, affordability check amount, and remaining debt for each year.
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @param annualInterestRate - The annual interest rate.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The monthly mortgage payment, affordability check amount, and remaining debt for each year.
 */
export function calculateMortgageDetails(
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  mortgageTermInYears: number,
): {
  monthlyPayment: number;
  affordabilityCheck: number;
  remainingDebtPerYear: { year: number; remainingDebt: number }[];
} {
  if (propertyPrice <= 0 || deposit < 0 || annualInterestRate < 0 || mortgageTermInYears <= 0) {
    return {
      monthlyPayment: 0,
      affordabilityCheck: 0,
      remainingDebtPerYear: [],
    };
  }

  const adjustedLoanAmount: number = propertyPrice - deposit;
  const numberOfPayments: number = mortgageTermInYears * 12;
  const monthlyInterestRate: number = annualInterestRate / 100 / 12;
  const remainingDebtPerYear: { year: number; remainingDebt: number }[] = [];

  // Handle the case when monthlyInterestRate is 0 
  if (monthlyInterestRate === 0) {
    const monthlyPayment: number = adjustedLoanAmount / numberOfPayments;

    return {
      monthlyPayment,
      affordabilityCheck: 0,
      remainingDebtPerYear: Array.from({ length: mortgageTermInYears + 1 }, (_, year) => {
        const totalPayments = monthlyPayment * 12 * year;
        return {
          year,
          remainingDebt: Math.max(adjustedLoanAmount - totalPayments, 0),
        };
      }),
    };
  }

  // Monthly mortgage payment formula
  const calculatePayment = (interestRate: number): number =>
    (adjustedLoanAmount *
      interestRate *
      Math.pow(1 + interestRate, numberOfPayments)) /
    (Math.pow(1 + interestRate, numberOfPayments) - 1);

  const monthlyPayment: number = calculatePayment(monthlyInterestRate);

  // Affordability check with increased interest rate
  const increasedInterestRate: number = annualInterestRate + 3;
  const monthlyInterestRateIncreased: number = increasedInterestRate / 100 / 12;
  const affordabilityCheck: number =
    increasedInterestRate === 0 ? adjustedLoanAmount / numberOfPayments : calculatePayment(monthlyInterestRateIncreased);

  // Calculate remaining debt at the end of each year
  let remainingDebt: number = adjustedLoanAmount;

  for (let year = 0; year <= mortgageTermInYears; year++) {
    remainingDebtPerYear.push({ year, remainingDebt: Math.max(remainingDebt, 0) });

    for (let month = 1; month <= 12; month++) {
      const interestForTheMonth: number = remainingDebt * monthlyInterestRate;
      const capitalForTheMonth: number = monthlyPayment - interestForTheMonth;
      remainingDebt -= capitalForTheMonth;
    }
    remainingDebt = +remainingDebt.toFixed(2);
  }

  return { monthlyPayment, affordabilityCheck, remainingDebtPerYear };
}
