'use client';
import CookingLoader from '@/app/loading';
import { AppStore, makeStore } from '@/redux/store';
import { useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore, Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  const persistedStoreRef = useRef<Persistor | null>(null);
  const [loading, setLoading] = useState(true);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      persistedStoreRef.current = persistStore(storeRef.current, {}, () => {
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return <CookingLoader/>; 
  }

  if (!persistedStoreRef.current) {
    return <p>Error loading persist store</p>;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistedStoreRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}