import React from 'react';
import Button from 'react-bootstrap/Button';
import { currencyFormat } from '../utils/number';
import * as S from './ProductTable.styled';
import { useSetRecoilState } from 'recoil';
import { updateProductAtom } from '../utils/store';

const ProductTable = ({ products, header, deleteItem, openEditForm }) => {
  const setUpdateProduct = useSetRecoilState(updateProductAtom);

  return (
    <div>
      <S.Container>
        {products?.data?.products?.length > 0 ? (
          products.data.products.map((item, index) => (
            <S.Wrapper key={item._id}>
              <S.Index>{index}</S.Index>
              <S.Sku>{item.sku}</S.Sku>
              <S.Name>{item.name}</S.Name>
              <S.Price>{currencyFormat(item?.price)}원</S.Price>
              <th>
                {item?.stock &&
                  Object.entries(item.stock).map(([size, quantity]) => (
                    <S.Stock key={size}>
                      {size}: {quantity}
                    </S.Stock>
                  ))}
              </th>
              <th>
                <S.ImageBox>
                  {item?.images?.map((image) => (
                    <S.Image key={image} src={image} width={100} alt={image} />
                  ))}
                </S.ImageBox>
              </th>
              <S.Status>{item.status}</S.Status>
              <th>
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => deleteItem(item._id)}
                  className='mr-1'
                >
                  DELETE
                </Button>
                <Button
                  size='sm'
                  onClick={() => {
                    openEditForm(item);
                    setUpdateProduct(item);
                  }}
                >
                  EDIT
                </Button>
              </th>
            </S.Wrapper>
          ))
        ) : (
          <tr>No Data to show</tr>
        )}
      </S.Container>
    </div>
  );
};

export default ProductTable;
