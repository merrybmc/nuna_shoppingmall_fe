import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { currencyFormat } from '../utils/number';
import { useGetProductsQuery } from '../api/hooks/ProductApi';
import * as S from './ProductTable.styled';
const ProductTable = ({ products, header, deleteItem, openEditForm }) => {
  console.log(products);

  return (
    <div>
      <S.Container>
        {products?.data.products.length > 0 ? (
          products?.data.products.map((item, index) => (
            <S.Wrapper key={item._id}>
              <S.Index>{index}</S.Index>
              <S.Sku>{item.sku}</S.Sku>
              <S.Name>{item.name}</S.Name>
              <S.Price>{currencyFormat(item.price)}원</S.Price>
              <th>
                {item.stock.map((count) => {
                  return (
                    <S.Stock>
                      {Object.entries(count).map(([size, quantity]) => (
                        <div key={size}>
                          {size}: {quantity}
                        </div>
                      ))}
                    </S.Stock>
                  );
                })}
              </th>
              <th>
                <S.ImageBox>
                  {item.images.map((image) => (
                    <S.Image src={image} width={100} alt={image} />
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
                <Button size='sm' onClick={() => openEditForm(item)}>
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
