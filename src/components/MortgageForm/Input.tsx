import React, { ChangeEvent } from 'react';
import { InputGroup, Form, } from 'react-bootstrap';

export interface InputProps {
    id: string;
    name?: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    symbol: string;
    step?: string;
    inputMode?: "numeric" | "search" | "text" | "none" | "tel" | "url" | "email" | "decimal" | undefined;
    isError?: boolean;
    errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
    id,
    name,
    label,
    value,
    onChange,
    symbol,
    step = 'any',
    inputMode = 'numeric',
    isError = false,
    errorMessage
}) => {

    return (
        <>
            <Form.Label htmlFor={id} >{label}</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>{symbol}</InputGroup.Text>
                <Form.Control
                    id={id}
                    name={id}
                    type="text"
                    inputMode={inputMode}
                    className="no-spinner"
                    step={step}
                    value={value}
                    onChange={onChange}
                    aria-describedby={isError ? `${id}-error` : undefined}
                />
            </InputGroup>
            {isError && <div id={`${id}-error`} className="text-danger mb-2">{errorMessage}</div>}
        </>
    )
};
