'use client';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#F8FAFC' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                background: '#FEF2F2',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
              }}
            >
              ⚠️
            </div>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#0F172A',
                marginBottom: '0.75rem',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#64748B',
                marginBottom: '0.5rem',
                lineHeight: '1.6',
              }}
            >
              An unexpected error occurred. Your calculation data is safe — all computation runs
              locally in your browser and is never sent to a server.
            </p>
            {error.digest && (
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
                Error ID: {error.digest}
              </p>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={reset}
                style={{
                  background: '#2563EB',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  background: 'white',
                  color: '#334155',
                  border: '1px solid #E2E8F0',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                Go to homepage
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
