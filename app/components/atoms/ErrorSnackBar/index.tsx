import React from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

type Props = {
  text: string;
  open: boolean;
  duration?: number;
  onClose?: () => void;
};

const ErrorSnackbar: React.FC<Props> = ({
  text,
  open,
  onClose,
  duration = 6000,
}) => {
  return (
    <Container>
      <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
        <StyledAlert variant="filled" severity="error">
          {text}
        </StyledAlert>
      </Snackbar>
    </Container>
  );
};

const StyledAlert = styled(Alert)`
  font-size: 2rem;
`;

const Container = styled.div`
  font-size: 16px;
`;

export default ErrorSnackbar;
