import type { NextApiRequest, NextApiResponse } from 'next';

interface InterestRate {
    interestRate: number
}

interface Cache {
    data: InterestRate | null;
    expiry: Date | null;
}

// Initialize cache with explicit types
const cache: Cache = {
    data: null,
    expiry: null,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiParams = {
        baseUrl: process.env.RATE_API_BASE_URL,
        csvFormat: "csv.x=yes",
        dateFrom: process.env.RATE_API_DATE_FROM || '18/Jan/2024',
        dateTo: process.env.RATE_API_DATE_TO || '18/Feb/2024',
        seriesCodes: "IUMABEDR",
        additionalOptions: "CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N"
    };

    const URL = `${apiParams.baseUrl}?${apiParams.csvFormat}&Datefrom=${encodeURIComponent(apiParams.dateFrom)}&Dateto=${encodeURIComponent(apiParams.dateTo)}&SeriesCodes=${apiParams.seriesCodes}&${apiParams.additionalOptions}`;

    // Check cache first
    const now = new Date();
    if (cache.data && cache.expiry && cache.expiry > now) {
        return res.status(200).json(cache.data);
    }

    try {
        const response = await fetch(URL);
        const text = await response.text();

        // Parse the CSV text to find the interest rate
        const lines = text.trim().split('\n');
        const interestRateLine = lines[1];
        const interestRateValue = interestRateLine.split(',')[1];

        // Update cache with the new data and expiry
        const data = { interestRate: parseFloat(interestRateValue) };
        cache.data = data;
        cache.expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Set cache to expire in 24 hours

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch interest rate' });
    }
}
