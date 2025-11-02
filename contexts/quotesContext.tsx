import { quotesService } from '@/services/quotes';
import { StoicQuote } from '@/types/quotes';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface QuotesContextType {
  quotes: StoicQuote[];
  loading: boolean;
}

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

export const QuotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<StoicQuote[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore subscription
  useEffect(() => {
    const unsubscribe = quotesService.subscribeToQuotes(
      (quotes) => {
        console.log('🔥 Firestore returned quotes:', quotes.length);
        console.log('🔥 Raw quotes data:', quotes);
        setQuotes(quotes);
        setLoading(false);
      },
      (error) => {
        console.error('❌ Firestore error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <QuotesContext.Provider value={{ quotes, loading }}>
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  return context;
};