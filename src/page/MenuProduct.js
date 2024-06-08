import React from 'react';
import { LayoutMaxWidth } from '../style/common.styled';
import { Outlet } from 'react-router';

export default function MenuProduct() {
  return (
    <LayoutMaxWidth>
      <Outlet />
    </LayoutMaxWidth>
  );
}
