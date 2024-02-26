
import { useState, useCallback, useEffect } from 'react';
import { calculateMortgageDetails } from '../../utils/MortgageCalculator/calculateMortgageDetails';
import { useFetchInterestRate } from './useFetchInterestRate';


export interface MortgageResultsProps {
    monthlyPayment: number;
    totalRepayment: number;
    totalCapital: number;
    totalInterest: number;
    affordabilityCheck: number;
    remainingDebtPerYear: { year: number; remainingDebt: number }[];
}

export const useMortgageCalculator = () => {
    const { interestRate, setInterestRate } = useFetchInterestRate()
    const [propertyPrice, setPropertyPrice] = useState<string>('');
    const [deposit, setDeposit] = useState<string>('');
    const [mortgageTerm, setMortgageTerm] = useState<string>('15');
    const [mortgageResults, setMortgageResults] = useState<MortgageResultsProps | null>(null);

    const handleCalculate = useCallback(() => {
        try {

            if (!propertyPrice) {
                return;
            }
            const { monthlyPayment, affordabilityCheck, remainingDebtPerYear } = calculateMortgageDetails(
                Number(propertyPrice),
                Number(deposit),
                Number(interestRate),
                Number(mortgageTerm)
            );

            const totalRepayment = Number(monthlyPayment) * (Number(mortgageTerm) * 12);
            const totalCapital = Number(propertyPrice) - Number(deposit);
            const totalInterest = totalRepayment - totalCapital;

            setMortgageResults({
                monthlyPayment,
                totalRepayment,
                totalCapital,
                totalInterest,
                affordabilityCheck,
                remainingDebtPerYear,
            });
        } catch (error) {
            console.error('Error while calculating mortgage results:', error);
        }
    }, [propertyPrice, deposit, interestRate, mortgageTerm]);

    return {
        propertyPrice,
        deposit,
        mortgageTerm,
        interestRate,
        mortgageResults,
        setPropertyPrice,
        setDeposit,
        setMortgageTerm,
        setInterestRate,
        handleCalculate,
    };
};
