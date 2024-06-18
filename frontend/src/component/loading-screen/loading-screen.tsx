import React from 'react';
import { useAppSelector } from '../../hook';
import { getIsLoading } from '../../store/api-communication/api-communication.selectors.ts';

export function LoadingScreen() {
  const isLoading = useAppSelector(getIsLoading);
  if (!isLoading) {
    return null;
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const spinnerStyle: React.CSSProperties = {
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  };

  const textStyle: React.CSSProperties = {
    marginTop: '20px',
    fontSize: '1.5em',
    color: '#333',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={overlayStyle}>
        <div style={containerStyle}>
          <div style={spinnerStyle}></div>
          <p style={textStyle}>Loading...</p>
        </div>
      </div>
    </>
  );
}
