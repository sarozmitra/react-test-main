import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { MortgageResultsProps } from '../../hooks/useMortgageCalculator';
import { TableRow } from './TableRow'
import { formatCurrency } from "@/utils/formatCurrency";

export const MortgageResults: React.FC<MortgageResultsProps> = ({
    monthlyPayment,
    totalRepayment,
    totalCapital,
    totalInterest,
    affordabilityCheck,
    remainingDebtPerYear,
}) => {

    return (
        <>
            <Col md="auto">
                <h2 className="pb-3" id="results-heading">Results</h2>
                <Table striped="columns" data-testid="mortgage-results" aria-labelledby="results-heading">
                    <tbody>
                        <TableRow label="Monthly Payment" value={monthlyPayment} />
                        <TableRow label="Total Repayment" value={totalRepayment} />
                        <TableRow label="Capital" value={totalCapital} />
                        <TableRow label="Interest" value={totalInterest} />
                        <TableRow label="Affordability Check" value={affordabilityCheck} />
                    </tbody>
                </Table>
            </Col>
            <Col md="auto">
                <h2 className="pb-3" id="breakdown-heading">Yearly Breakdown</h2>
                <Table className="max-w-52" bordered hover size="sm" data-testid="mortgage-yearly-breakdown" aria-labelledby="breakdown-heading">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Remaining Debt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {remainingDebtPerYear?.map(({ year, remainingDebt }) => (
                            <tr key={year}>
                                <th scope="row">{year}</th>
                                <td>{formatCurrency(Math.round(remainingDebt), 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </>

    )
}