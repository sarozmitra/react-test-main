import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MortgageForm } from './MortgageForm';

describe('MortgageForm component', () => {
    beforeEach(() => {
        mockOnCalculate.mockClear();
    });

    const mockOnCalculate = jest.fn();
    const setup = () => render(
        <MortgageForm
            propertyPrice=""
            deposit=""
            mortgageTerm=""
            interestRate=""
            setPropertyPrice={jest.fn()}
            setDeposit={jest.fn()}
            setMortgageTerm={jest.fn()}
            setInterestRate={jest.fn()}
            onCalculate={mockOnCalculate}
        />
    );

    it('submit the form and call onCalculate if inputs are valid', async () => {
        setup();
        const priceInput = screen.getByLabelText('Property Price');
        const depositInput = screen.getByLabelText('Deposit');
        const termInput = screen.getByLabelText('Mortgage Term');
        const interestInput = screen.getByLabelText('Interest rate');

        await userEvent.type(priceInput, '300000');
        await userEvent.type(depositInput, '60000');
        await userEvent.type(termInput, '25');
        await userEvent.type(interestInput, '3.5');

        fireEvent.submit(screen.getByTestId('mortgage-form'));
        expect(mockOnCalculate).toHaveBeenCalled();
    });

    it('submit the form with the empty property price and display error', async () => {
        setup();
        const priceInput = screen.getByLabelText('Property Price');
        await userEvent.clear(priceInput);
        fireEvent.submit(screen.getByTestId('mortgage-form'));
        expect(mockOnCalculate).toHaveBeenCalled();
        expect(screen.getByText('Enter a property price, for example £100,000.')).toBeInTheDocument();
    });
});

