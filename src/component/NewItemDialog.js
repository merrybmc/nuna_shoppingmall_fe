import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import '../style/adminProduct.style.css';
import * as S from './NewItemDialog.styled';
import { useProductCreateMutation, useProductUpdateMutation } from '../api/hooks/ProductApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { updateProductAtom } from '../utils/store.js';

const SIZE = ['S', 'M', 'L', 'XL'];
const KIND = ['', 'WOMEN', 'MEN', 'KIDS'];
const CATEGORY = ['', 'TOP', 'BOTTOM', 'SHOES', 'BAG', 'ACCESSORY'];
const STATUS = ['active', 'disactive'];

const InitialFormData = {
  name: '',
  sku: '',
  stock: {},
  image: [],
  description: '',
  kind: '',
  category: '',
  status: 'active',
  price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const [formData, setFormData] = useState(InitialFormData);
  const [stock, setStock] = useState([]);
  const [skuError, setSkuError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imgPreviews, setImgPreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const baseProduct = useRecoilValue(updateProductAtom);

  useEffect(() => {
    if (mode === 'edit' && baseProduct) {
      setFormData(baseProduct);
      setImgPreviews(
        baseProduct.images.map((data) => {
          return { preview: data };
        })
      );
      const transformedStock = baseProduct.stock.flatMap((item) =>
        Object.entries(item).map(([key, value]) => [key, value])
      );
      setStock(transformedStock);
      console.log(formData);
    }
    console.log(formData);
  }, [baseProduct]);

  const queryClient = useQueryClient();

  const { mutate: createMutate, isPending: createLoading } = useProductCreateMutation();
  const { mutate: updateMutate, isPending: updateLoading } = useProductUpdateMutation();

  const handleClose = () => {
    setFormData(InitialFormData);
    setSkuError(false);
    setStockError(false);
    setImageError(false);
    setImgPreviews([]);
    setImageFiles([]);
    setStock([]);
    setShowDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.kind === '' && formData.category === '') {
      alert('kind 또는 category를 선택해주세요');
    }
    if (!stock.length) {
      setStockError(true);
      return;
    } else {
      setStockError(false);
    }

    if (!imageFiles.length) {
      setImageError(true);
      return;
    } else {
      setImageError(false);
    }

    const totalStock = stock.reduce((total, item) => {
      return { ...total, [item[0]]: parseInt(item[1]) };
    }, {});

    let form = new FormData();
    const { name, sku, description, kind, category, status, price } = formData;

    imageFiles.forEach((file) => {
      form.append('images', file);
    });

    form.append('name', name);
    form.append('sku', sku);
    form.append('stock', JSON.stringify(totalStock));
    form.append('description', description);
    form.append('kind', kind);
    form.append('category', category);
    form.append('status', status);
    form.append('price', price);

    if (mode === 'new')
      createMutate(
        { path: '/product', data: form },
        {
          onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries(['getproduct']);
          },
          onError: ({ error }) => {
            error.includes('E11000') && setSkuError(true);
          },
        }
      );

    if (mode === 'edit')
      updateMutate(
        { path: `/product/${formData._id}`, data: form },
        {
          onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries(['getproduct']);
          },
          onError: ({ error }) => {
            error.includes('E11000') && setSkuError(true);
          },
        }
      );
  };

  //form에 데이터 넣어주기
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  //재고타입 추가시 배열에 새 배열 추가
  const addStock = () => {
    setStock([...stock, []]);
  };

  //재고 삭제하기
  const deleteStock = (idx) => {
    const newStock = stock.filter((item, index) => index !== idx);
    setStock(newStock);
  };

  //  재고 사이즈 변환하기
  const handleSizeChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  // 재고 수량 변경하기
  const handleStockChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][1] = value;
    setStock(newStock);
  };

  // 종류 변경
  const onHandleKind = (event) => {
    setFormData({
      ...formData,
      kind: event.target.value,
    });
  };

  // 카테고리 변경
  const onHandleCategory = (event) => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      category: event.target.value,
    });
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === 'edit') {
        // 선택된 데이터값 불러오기 (재고 형태 객체에서 어레이로 바꾸기)
      } else {
        // 초기화된 값 불러오기
      }
    }
  }, [showDialog]);

  //에러나면 토스트 메세지 보여주기

  // 이미지 생성 시작 target.files 넘기기
  const handleFileChange = (e) => {
    e.target.files && processFiles(e.target.files);
  };

  // 이미지 끌어와서 생성하기
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.files && processFiles(e.dataTransfer.files);
  };

  // 이미지 업로드 로직, 조건 검사
  const processFiles = (fileList) => {
    let sameFileCheck = false;

    if (fileList.length + imgPreviews.length > 5) {
      alert('최대 5장만 업로드 가능합니다.');
      return;
    }

    const fileArray = Array.from(fileList);

    fileArray.forEach((file) =>
      imgPreviews.forEach((img) => {
        if (file.lastModified === img.id) {
          sameFileCheck = true;
          return;
        }
      })
    );

    if (sameFileCheck) {
      alert('동일한 사진이 존재합니다.');
      return;
    }

    setImageFiles((prevFiles) => [...prevFiles, ...fileArray]);

    const filePreviews = fileArray.map((file) => resizeImage(file));

    Promise.all(filePreviews).then((files) => {
      setImgPreviews((prevFiles) => [...prevFiles, ...files]);
    });
  };

  // 이미지 리사이징
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        img.src = e.target.result.toString();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 500;
          const maxHeight = 500;
          let { width, height } = img;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const resizedImage = canvas.toDataURL('image/png');

          resolve({ name: file.name, preview: resizedImage, id: file.lastModified });
        };
      };
    });
  };

  // 이미지 삭제
  const deleteImage = (id) => {
    const deletedImgPreviews = imgPreviews.filter((file) => id !== file.id);
    const deletedImageFiles = imageFiles.filter((file) => id !== file.lastModified);

    setImgPreviews(deletedImgPreviews);
    setImageFiles(deletedImageFiles);
  };

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === 'new' ? (
          <Modal.Title>Create New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      <Form className='form-container' onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='sku'>
            <Form.Label>Sku</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='string'
              placeholder='Enter Sku'
              required
              value={formData.sku}
            />
            {skuError && <p className='error-message'>동일한 이름의 상품이 존재합니다.</p>}
          </Form.Group>

          <Form.Group as={Col} controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='string'
              placeholder='Name'
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='string'
            placeholder='Description'
            as='textarea'
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='stock'>
          <Form.Label className='mr-1'>Stock</Form.Label>
          {stockError && <span className='error-message'>재고를 추가해주세요</span>}
          <Button size='sm' onClick={addStock}>
            Add +
          </Button>
          <div className='mt-2'>
            {stock.map((item, index) => (
              <Row key={index}>
                <Col sm={4}>
                  <Form.Select
                    onChange={(event) => handleSizeChange(event.target.value, index)}
                    required
                    defaultValue={item[0] ? item[0].toLowerCase() : ''}
                  >
                    <option value='' disabled selected hidden>
                      Please Choose...
                    </option>
                    {SIZE.map((item, index) => (
                      <option
                        invalid='true'
                        value={item.toLowerCase()}
                        disabled={stock.some((size) => size[0] === item.toLowerCase())}
                        key={index}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control
                    onChange={(event) => handleStockChange(event.target.value, index)}
                    type='number'
                    placeholder='number of stock'
                    value={item[1]}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button variant='danger' size='sm' onClick={() => deleteStock(index)}>
                    -
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='Image' required>
          <S.AddImgBox>
            <label htmlFor='imageInput'>
              <S.ImgDragOnBox onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                <input
                  type='file'
                  id='imageInput'
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept='image/*'
                />
                <S.CameraImg src='/image/camera.png' />
                <S.ImgCount>{imgPreviews.length}/5</S.ImgCount>
              </S.ImgDragOnBox>
            </label>
            <S.ImgBox>
              {imgPreviews.map((file) => (
                <S.ImgPreviewBox key={file.preview}>
                  <S.ImgDeleteBox
                    src='/image/delete_button.png'
                    onClick={() => deleteImage(file.id)}
                  />
                  <S.ImgPreview src={file.preview} alt='Preview' />
                </S.ImgPreviewBox>
              ))}
            </S.ImgBox>
          </S.AddImgBox>
          {imageError && <p className='error-message'>이미지를 최소 1개 이상 추가해주세요.</p>}
        </Form.Group>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type='number'
              placeholder='0'
            />
          </Form.Group>

          <Form.Group as={Col} controlId='kind'>
            <Form.Label>Kind</Form.Label>
            <Form.Control as='select' onChange={onHandleKind} value={formData.kind} required>
              {KIND.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='select'
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select value={formData.status} onChange={handleChange} required>
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        {mode === 'new' ? (
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        ) : (
          <Button variant='primary' type='submit'>
            Edit
          </Button>
        )}
      </Form>
      {(createLoading || updateLoading) && (
        <S.ApiSpinner
          thickness='7px'
          speed='0.5s'
          emptyColor='cyan.200'
          color='blue.500'
          size='xl'
        />
      )}
    </Modal>
  );
};

export default NewItemDialog;
