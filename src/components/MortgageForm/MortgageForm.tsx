import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Input } from './Input'

export interface MortgageFormProps {
    propertyPrice: string;
    deposit: string;
    mortgageTerm: string;
    interestRate: string;
    setPropertyPrice: (value: string) => void;
    setDeposit: (value: string) => void;
    setMortgageTerm: (value: string) => void;
    setInterestRate: (value: string) => void;
    onCalculate: () => void;
}

export const MortgageForm: React.FC<MortgageFormProps> = ({
    propertyPrice,
    deposit,
    mortgageTerm,
    interestRate,
    setPropertyPrice,
    setDeposit,
    setMortgageTerm,
    setInterestRate,
    onCalculate
}) => {
    const [propertyPriceError, setPropertyPriceError] = useState<string | null>(null);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        setValue: (value: string) => void
    ) => {
        let inputValue = e.target.value.trim();

        inputValue = inputValue.replace(/[^\d.]/g, '');
        setValue(inputValue);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!propertyPrice || !propertyPrice.toString().trim()) {
            setPropertyPriceError('Enter a property price, for example £100,000.');
        } else {
            setPropertyPriceError(null);
        }

        if (!propertyPriceError) {
            onCalculate();
        }
    };

    return (
        <Form onSubmit={handleSubmit} data-testid="mortgage-form">
            <Input
                id="price"
                label="Property Price"
                value={propertyPrice}
                onChange={(e) => handleInputChange(e, setPropertyPrice)}
                symbol="£"
                isError={!!propertyPriceError}
                errorMessage={propertyPriceError || ''}
            />
            <Input
                id="deposit"
                label="Deposit"
                value={deposit}
                onChange={(e) => handleInputChange(e, setDeposit)}
                symbol="£"
            />
            <Input
                id="term"
                label="Mortgage Term"
                value={mortgageTerm}
                onChange={(e) => handleInputChange(e, setMortgageTerm)}
                symbol="years"
            />
            <Input
                id="interest"
                label="Interest rate"
                value={interestRate}
                onChange={(e) => handleInputChange(e, setInterestRate)}
                symbol="%"
            />

            <Button className="w-full" variant="primary" type="submit">
                Calculate
            </Button>
        </Form>
    )
}
