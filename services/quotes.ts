import { db } from '@/lib/firebase';
import { StoicQuote } from '@/types/quotes';

const QUOTES_COLLECTION = 'quotes';

export const quotesService = {
  /**
   * Subscribe to all quotes with real-time updates
   */
  subscribeToQuotes: (
    onUpdate: (quotes: StoicQuote[]) => void,
    onError: (error: Error) => void
  ) => {
    return db
      .collection(QUOTES_COLLECTION)
      .onSnapshot(
        (snapshot) => {
          const quotes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as StoicQuote[];
          console.log('🔥 Firestore snapshot docs count:', snapshot.docs.length);
          onUpdate(quotes);
        },
        (error) => {
          console.error('Firestore listener error:', error);
          onError(error);
        }
      );
  },

  /**
   * Add a new quote (for development/testing)
   */
  addQuote: async (text: string, author: string, category?: string): Promise<string> => {
    try {
      const docRef = await db.collection(QUOTES_COLLECTION).add({
        text,
        author,
        ...(category && { category }),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding quote:', error);
      throw error;
    }
  },
};