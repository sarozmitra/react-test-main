import { renderHook, waitFor } from '@testing-library/react';
import { useFetchInterestRate } from './useFetchInterestRate';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('useFetchInterestRate', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetches and sets the interest rate successfully', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        fetchMock.mockResponseOnce(JSON.stringify({ interestRate: '3.25' }));
        const { result } = renderHook(() => useFetchInterestRate());
        await waitFor(() => expect(result.current.interestRate).toBe('3.25'));
    });

    it('handles fetch failure correctly', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        fetchMock.mockReject(new Error('Failed to fetch'));
        const { result } = renderHook(() => useFetchInterestRate());
        await waitFor(() => expect(result.current.interestRate).toBe('2.25'));
    });
});
