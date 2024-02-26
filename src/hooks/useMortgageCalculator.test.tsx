import { renderHook, act } from '@testing-library/react';
import { useMortgageCalculator } from './useMortgageCalculator';
import * as MortgageCalculator from '../../utils/MortgageCalculator/calculateMortgageDetails';

jest.mock('../../utils/MortgageCalculator/calculateMortgageDetails', () => ({
    calculateMortgageDetails: jest.fn(),
}));

const mockedCalculateMortgageDetails = MortgageCalculator.calculateMortgageDetails as jest.MockedFunction<typeof MortgageCalculator.calculateMortgageDetails>;

describe('useMortgageCalculator', () => {
    beforeEach(() => {
        mockedCalculateMortgageDetails.mockClear();
        mockedCalculateMortgageDetails.mockImplementation(() => ({
            monthlyPayment: 763.68,
            affordabilityCheck: 921.63,
            remainingDebtPerYear: [{ year: 1, remainingDebt: 90721 }],
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calculates mortgage results correctly', () => {
        const { result } = renderHook(() => useMortgageCalculator());

        act(() => {
            result.current.setPropertyPrice('100000');
            result.current.setDeposit('5000');
            result.current.setInterestRate('5.25');
            result.current.setMortgageTerm('15');
        });

        act(() => {
            result.current.handleCalculate();
        });

        expect(mockedCalculateMortgageDetails).toHaveBeenCalledWith(100000, 5000, 5.25, 15);

        const totalRepayment = 763.68 * (15 * 12);
        const totalCapital = 95000;
        const totalInterest = totalRepayment - totalCapital;

        expect(result.current.mortgageResults).toEqual({
            monthlyPayment: 763.68,
            totalCapital: 95000,
            totalRepayment,
            totalInterest,
            affordabilityCheck: 921.63,
            remainingDebtPerYear: [{ year: 1, remainingDebt: 90721 }],
        });
    });
});
