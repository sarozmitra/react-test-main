import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MortgageForm } from './MortgageForm';

describe('MortgageForm component', () => {
    const mockOnCalculate = jest.fn();

    beforeEach(() => {
        mockOnCalculate.mockClear();
    });

    it('does not call onCalculate if propertyPrice is invalid', async () => {
        render(
            <MortgageForm
                propertyPrice=""
                deposit="50000"
                mortgageTerm="30"
                interestRate="5.0"
                setPropertyPrice={jest.fn()}
                setDeposit={jest.fn()}
                setMortgageTerm={jest.fn()}
                setInterestRate={jest.fn()}
                onCalculate={mockOnCalculate}
            />
        )
        fireEvent.submit(screen.getByTestId('mortgage-form'));

        expect(screen.getByText('Enter a property price, for example £100,000.')).toBeInTheDocument();
        expect(mockOnCalculate).not.toHaveBeenCalled();
    });

    it('calls onCalculate if inputs are valid', async () => {
        render(
            <MortgageForm
                propertyPrice="100000"
                deposit="50000"
                mortgageTerm="30"
                interestRate="5.0"
                setPropertyPrice={jest.fn()}
                setDeposit={jest.fn()}
                setMortgageTerm={jest.fn()}
                setInterestRate={jest.fn()}
                onCalculate={mockOnCalculate}
            />
        )
        fireEvent.submit(screen.getByTestId('mortgage-form'));
        expect(mockOnCalculate).toHaveBeenCalled();
    });
});

