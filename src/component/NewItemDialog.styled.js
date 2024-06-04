import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

export const AddImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ImgDragOnBox = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  padding: 20px 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px dashed #8587ff;
  background: #f7f8fb;
  cursor: pointer;
`;

export const BoldText = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;

export const ImgCount = styled.p`
  color: blue;
`;

export const ImgBox = styled.div`
  display: flex;

  width: 350px;
  height: 100px;

  overflow: scroll;

  padding: 10px 25px 50px 10px;
  /* align-items: flex-start; */
  gap: 15px;
  border-radius: 20px;
  background: #f7f8fb;
  /* background-color: gray; */
`;

export const CameraImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const ImgPreviewBox = styled.div`
  min-width: 80px;
  height: 40px;
  position: relative;
`;

export const ImgDeleteBox = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: -5px;
  top: -5px;

  cursor: pointer;
`;

export const ImgPreview = styled.img`
  width: 80px;
  height: 80px;
  border: 1px solid black;
  padding: 1px;
  border-radius: 15px;

  object-fit: contain;
`;

export const ApiSpinner = styled(Spinner)`
  position: absolute;
  top: 45%;
  left: 45%;
  transform: translate(-50%, -50%);
`;
