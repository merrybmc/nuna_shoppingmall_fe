import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

export const Layout = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const Fixed = styled.div`
  position: fixed;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 1680px;
  width: 100%;
`;

export const UserMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
  padding-top: 8px;
  font-size: 14px;
  gap: 20px;
  color: #4e4e4e;
`;

export const LogoSearchWrapper = styled.div`
  height: 146px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const LogoBtn = styled.button`
  position: absolute;
  left: 0;
  padding: 12px;
`;

export const LogoImg = styled.img`
  width: 120px;
  height: 20px;
  margin-left: 28px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 392px;
  height: 45px;
  font-size: 14px;

  padding-right: 40px;

  border-bottom: 1px solid black;
  outline: none;
`;

export const SearchIcon = styled(IoIosSearch)`
  position: relative;
  right: 30px;
  width: 26px;
  height: 45px;

  cursor: pointer;
`;

export const MenuList = styled.div`
  display: flex;
  justify-content: center;
  gap: 26px;
`;

export const Menu = styled.button`
  font-family: proxima-nova;
  color: black;
  height: 49px;
  font-size: 14px;
  font-weight: 700;
`;
