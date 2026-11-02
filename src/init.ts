import React from 'react';
import * as ReactDOM from 'react-dom';

// Ensure React & ReactDOM are available globally for legacy modules & components
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).ReactDOM = ReactDOM;
}

export {};

