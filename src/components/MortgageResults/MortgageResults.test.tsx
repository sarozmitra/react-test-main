import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MortgageResults } from './MortgageResults';

jest.mock('../../../utils/formatCurrency', () => ({
    formatCurrency: (value: number) => `£${value}`,
}));

describe('MortgageResults', () => {
    const mockData = {
        monthlyPayment: 763.68,
        totalRepayment: 137463.09,
        totalCapital: 95000,
        totalInterest: 42463.09,
        affordabilityCheck: 921.63,
        remainingDebtPerYear: [
            { year: 1, remainingDebt: 95000 },
            { year: 2, remainingDebt: 90721 },
        ],
    };

    it('render the results correctly', () => {
        render(<MortgageResults {...mockData} />);

        expect(screen.getByTestId('mortgage-results')).toBeInTheDocument();
        expect(screen.getByText(/Monthly Payment/)).toBeInTheDocument();
        expect(screen.getByText(/Total Repayment/)).toBeInTheDocument();
        expect(screen.getByText(/Capital/)).toBeInTheDocument();
        expect(screen.getByText(/Interest/)).toBeInTheDocument();
        expect(screen.getByText(/Affordability Check/)).toBeInTheDocument();

        expect(screen.getByText('£763.68')).toBeInTheDocument();
        expect(screen.getByText('£137463.09')).toBeInTheDocument();
    });

    it('render the yearly breakdown correctly', () => {
        render(<MortgageResults {...mockData} />);

        const yearlyBreakdownTable = screen.getByTestId('mortgage-yearly-breakdown');
        expect(yearlyBreakdownTable).toBeInTheDocument();

        expect(within(yearlyBreakdownTable).getByText('Year')).toBeInTheDocument();
        expect(within(yearlyBreakdownTable).getByText('Remaining Debt')).toBeInTheDocument();

        expect(within(yearlyBreakdownTable).getByText('1')).toBeInTheDocument();
        const remainingDebtEntries = within(yearlyBreakdownTable).getAllByText('£95000');
        expect(remainingDebtEntries.length).toBe(1);

        expect(within(yearlyBreakdownTable).getByText('2')).toBeInTheDocument();
        expect(within(yearlyBreakdownTable).getByText('£90721')).toBeInTheDocument();
    });

});