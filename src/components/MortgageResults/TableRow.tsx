import { formatCurrency } from '@/utils/formatCurrency';

interface TableRowProps {
    label: string;
    value: number;
    isCurrency?: boolean
}

export const TableRow: React.FC<TableRowProps> = ({ label, value, isCurrency = true }) => (
    <tr className="border-b">
        <th scope="row">{label}</th>
        <td className="text-right" aria-label={isCurrency ? `${label}: ${formatCurrency(value)}` : label}>
            {isCurrency ? formatCurrency(value) : value}
        </td>
    </tr>
);