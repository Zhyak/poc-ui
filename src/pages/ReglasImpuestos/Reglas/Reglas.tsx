import {
    Box,
    Typography,
} from '@mui/material';
import React from 'react';
import BaseLayout from '../../../components/BaseLayout';


const Reglas = ({
  open,
}: {
  open: boolean;
}) => {

  return (
    <BaseLayout open={open}>
      <Box>
        <Typography>Reglas</Typography>
      </Box>
    </BaseLayout>
  );
};

export default Reglas;
