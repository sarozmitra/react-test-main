import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableRow } from './TableRow';

jest.mock('../../../utils/formatCurrency', () => ({
    formatCurrency: (value: number) => `£${value}`,
}));

describe('TableRow', () => {
    it('render correctly with currency formatting', () => {
        render(
            <table>
                <tbody>
                    <TableRow label="Monthly Payment" value={1000} isCurrency={true} />
                </tbody>
            </table>
        );

        expect(screen.getByRole('rowheader')).toHaveTextContent('Monthly Payment');
        expect(screen.getByText(`£1000`)).toBeInTheDocument();
        expect(screen.getByText(`£1000`)).toHaveAttribute('aria-label', 'Monthly Payment: £1000');
    });

    it('renders correctly without currency formatting', () => {
        render(
            <table>
                <tbody>
                    <TableRow label="Monthly Payment" value={1000} isCurrency={false} />
                </tbody>
            </table>
        );

        expect(screen.getByRole('rowheader')).toHaveTextContent('Monthly Payment');
        expect(screen.getByText('1000')).toBeInTheDocument();
        expect(screen.getByText('1000')).toHaveAttribute('aria-label', 'Monthly Payment');
    });
});
