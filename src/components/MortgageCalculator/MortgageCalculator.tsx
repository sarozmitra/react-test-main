import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MortgageForm } from '../MortgageForm';
import { MortgageResults } from '../MortgageResults';
import { useMortgageCalculator } from '../../hooks/useMortgageCalculator'

export const MortgageCalculator: React.FC = () => {
    const {
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
    } = useMortgageCalculator();

    return (
        <Container data-testid="mortgage-calculator">
            <Row className="gap-x-10 pt-3">
                <Col className="border-r" md="auto">
                    <MortgageForm
                        propertyPrice={propertyPrice}
                        deposit={deposit}
                        mortgageTerm={mortgageTerm}
                        interestRate={interestRate}
                        setPropertyPrice={setPropertyPrice}
                        setDeposit={setDeposit}
                        setMortgageTerm={setMortgageTerm}
                        setInterestRate={setInterestRate}
                        onCalculate={handleCalculate}
                    />
                </Col>

                {mortgageResults && mortgageResults.monthlyPayment !== 0 && <MortgageResults {...mortgageResults} />}
            </Row>
        </Container>
    );
};
