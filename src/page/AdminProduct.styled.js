import { Spinner } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export const ReactPaginateStyle = styled(ReactPaginate)`
  display: flex;
  justify-content: center;

  gap: 12px;
  font-size: 28px;
  font-family: proxima-nova;
`;

export const ApiSpinner = styled(Spinner)`
  position: absolute;
  top: 230%;
  left: 48%;
`;
