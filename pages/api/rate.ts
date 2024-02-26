import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N';

    try {
        const response = await fetch(url);
        const text = await response.text();

        // Parse the CSV text to find the interest rate
        const lines = text.trim().split('\n');
        const interestRateLine = lines[1];
        const interestRateValue = interestRateLine.split(',')[1];

        res.status(200).json({ interestRate: parseFloat(interestRateValue) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch interest rate' });
    }
}