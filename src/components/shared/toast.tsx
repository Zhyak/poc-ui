import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ToastProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, severity = 'success', autoHideDuration = 3000, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
