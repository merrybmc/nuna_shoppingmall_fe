import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { currencyFormat } from '../utils/number';
import { useGetProductsQuery } from '../api/hooks/ProductApi';
const ProductTable = ({ products, header, deleteItem, openEditForm }) => {
  return (
    <div className='overflow-x'>
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ height: '300px' }}>
          {products?.data.length > 0 ? (
            products?.data.map((item, index) => (
              <tr key={item._id}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: '100px' }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {item.stock.map((count) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          // height: '140px',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {Object.entries(count).map(([size, quantity]) => (
                          <div key={size}>
                            {size}: {quantity}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </th>
                <th>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',

                      gap: '15px',
                    }}
                  >
                    {item.images.map((image) => (
                      <img src={image} width={100} alt={image} />
                    ))}
                  </div>
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: '100px' }}>
                  <Button
                    size='sm'
                    variant='danger'
                    onClick={() => deleteItem(item._id)}
                    className='mr-1'
                  >
                    -
                  </Button>
                  <Button size='sm' onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
