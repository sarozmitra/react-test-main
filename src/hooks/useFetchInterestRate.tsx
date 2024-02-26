import { useEffect, useState } from "react";

const useFetchInterestRate = () => {
    const [interestRate, setInterestRate] = useState<string>('2.25');

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/rate');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.interestRate) {
                    setInterestRate(data.interestRate.toString());
                }
            } catch (error) {
            }
        })();
    }, []);

    return { interestRate, setInterestRate };
};

export default useFetchInterestRate;
