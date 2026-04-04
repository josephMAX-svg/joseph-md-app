import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for offline-safe Supabase queries.
 * Returns { data, loading, error, refetch }
 *
 * Usage:
 *   const { data: count, refetch } = useSupabaseQuery(getApexQueueCount, 0);
 */
export function useSupabaseQuery<T>(
  queryFn: () => Promise<T>,
  defaultValue: T,
  deps: unknown[] = [],
): {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Offline');
        setData(defaultValue);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
