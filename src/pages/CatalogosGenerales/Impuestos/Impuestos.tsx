import React, { useContext, useState } from 'react';
import { Box, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import BaseLayout from 'components/BaseLayout';
import CustomCollapse from 'components/Collapse/CustomCollapse';
import {
  ActionButton,
  Filters,
  HeaderContainer,
  Search,
  Title,
} from 'components/StyledComponents';
import useImpuestos from 'api/impuestos';
import { Impuesto } from 'api/types';
import { IMPUESTOS_CREATE } from 'components/Modals/types';
import {
  ModalContextType,
  ModalContext,
} from 'components/Modals/Providers/ModalProvider';
interface ImpuestosProps {
  open: boolean;
}

const emptyInfoImpuestos: Impuesto = {
  id: -1,
  mnemonico: '',
  descripcion: '',
  usuario: '',
};

const Impuestos: React.FC<ImpuestosProps> = ({ open }) => {
  const [formData, setFormData] = useState<Impuesto>(emptyInfoImpuestos);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const { impuestos, error } = useImpuestos();
  const { openModal } = useContext<ModalContextType>(ModalContext);

  if (error) {
    console.error('Error al cargar impuestos:', error);
    return (
      <BaseLayout open={open}>
        <Typography color='error'>
          Ocurrió un error al cargar los impuestos.
        </Typography>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout open={open}>
      <Box display='flex' flexDirection='column'>
        <HeaderContainer>
          <Title>Impuestos</Title>
          <ActionButton
            onClick={() => {
              setSelectedId(-1);
              setFormData(emptyInfoImpuestos);
              openModal(IMPUESTOS_CREATE);
            }}
            variant='contained'
          >
            <Typography>+ Agregar Impuesto</Typography>
          </ActionButton>
        </HeaderContainer>

        <Filters>
          <Search>
            <InputBase sx={{ flex: 1 }} placeholder='Buscar Impuesto' />
            <SearchIcon />
          </Search>
        </Filters>

        <div className='mt-4'>
          {impuestos.map((impData: any) => (
            <CustomCollapse
              key={impData.id}
              elemId={impData.id}
              title={impData.impuesto.mnemonico}
              subtitle={impData.impuesto.descripcion}
            />
          ))}
        </div>
      </Box>
    </BaseLayout>
  );
};

export default Impuestos;
