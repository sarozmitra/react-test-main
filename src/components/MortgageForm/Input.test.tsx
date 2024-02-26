import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        render(
            <Input
                id="test-input"
                label="Test Label"
                value=""
                onChange={mockOnChange}
                symbol="£"
                inputMode="text"
                isError={false}
            />
        );
    });

    it('render correctly', () => {
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('£')).toBeInTheDocument();
        expect(screen.queryByRole('textbox')).toHaveAttribute('inputMode', 'text');
    });

    it('calls onChange prop when changed', async () => {
        const input = screen.getByRole('textbox');
        await userEvent.type(input, '123');
        expect(mockOnChange).toHaveBeenCalledTimes(3);
    });

    it('display error message when isError is true', () => {
        render(
            <Input
                id="test-input"
                label="Test Label"
                value=""
                onChange={mockOnChange}
                symbol="£"
                inputMode="text"
                isError={true}
                errorMessage="Error message"
            />
        );
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toHaveClass('text-danger');
    });

    it('does not display error message when isError is false', () => {
        expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
});
