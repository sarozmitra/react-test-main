import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MortgageCalculator } from './MortgageCalculator';

describe("MortgageCalculator", () => {
    it('render component', () => {
        render(<MortgageCalculator />);
        expect(screen.getByTestId('mortgage-calculator')).toBeInTheDocument();
    });

    it('updates mortgage results when form is submitted', () => {
        render(<MortgageCalculator />);

        fireEvent.change(screen.getByLabelText(/Property Price/i), { target: { value: '300000' } });
        fireEvent.change(screen.getByLabelText(/Deposit/i), { target: { value: '60000' } });
        fireEvent.change(screen.getByLabelText(/Mortgage Term/i), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText(/Interest rate/i), { target: { value: '5.25' } });

        fireEvent.click(screen.getByText(/Calculate/i));

        expect(screen.getByTestId('mortgage-results')).toBeInTheDocument();
        expect(screen.queryByTestId('mortgage-yearly-breakdown')).toBeInTheDocument();
    });

})
