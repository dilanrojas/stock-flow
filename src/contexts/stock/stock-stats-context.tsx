import { createContext, useContext, useEffect, useState } from "react";
import type { StockStatsResponse } from "../../../lib/types/stock";
import { getStockStats } from "../../../services/stock/get-stats";

type StockStatsContextType = {
    stats: StockStatsResponse | null;
    isLoading: boolean;
    error: string | null;
    refreshStats: () => Promise<void>;

}


const StockStatsContext = createContext<StockStatsContextType | null>(null);


export default function StockStatsProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<StockStatsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStats = async () => {
        try {
            const response = await getStockStats();
            setStats(response);
        } catch (fetchError) {
            setError(fetchError instanceof Error ? fetchError.message : 'Unable to load stock stats');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
    }, [])


    return (
        <StockStatsContext.Provider value={{ stats, isLoading, error, refreshStats: loadStats }}>
            {children}
        </StockStatsContext.Provider>
    )

}



export function useStockStatsContext() {
    const context = useContext(StockStatsContext);
    if (!context) {
        throw new Error('useStockStatsContext must be used within a StockStatsProvider');
    }
    return context;
}