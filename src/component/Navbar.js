import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faBox, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useLogoutMutation } from './../api/hooks/SignApi';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../utils/store';
import * as S from './Navbar.styled';
import SearchBox from './SearchBox';
import { useQueryClient } from '@tanstack/react-query';
import { LayoutMaxWidth } from '../style/common.styled';

const menuList = ['WOMEN', 'MEN', 'KIDS', 'TOP', 'BOTTOM', 'SHOES', 'BAG', 'ACCESSORY'];

const Navbar = ({ user }) => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState('');

  const { data: userInfo } = useGetUserInfoQuery('/user');

  console.log(userInfo);

  const onCheckEnter = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        onSearch();
      }
      queryClient.invalidateQueries('[getproduct]');
      navigate(`?name=${event.target.value}`);
    }
  };

  const onSearch = () => {
    if (searchInput === '') {
      queryClient.invalidateQueries('[getproduct]');
      return navigate('/');
    }
    queryClient.invalidateQueries('[getproduct]');
    navigate(`?name=${searchInput}`);
  };

  const { mutate: logoutMutate } = useLogoutMutation();

  const logout = () => {
    logoutMutate(
      { path: '/auth/logout' },
      {
        onSuccess: () => {
          navigate('/');
          window.location.reload();
        },
        onError: () => {
          alert('로그아웃 실패');
        },
      }
    );
  };

  return (
    <S.Layout>
      <S.Fixed>
        <S.Container>
          <S.UserMenu>
            {userInfo?.data.level === 'admin' && <Link to='/admin/product?page=1'>ADMIN PAGE</Link>}
            <button onClick={() => navigate('/mypage/info')}>MYPAGE</button>
            <button
              onClick={() => {
                alert('coming soon');
                navigate('/cart');
              }}
            >
              SHOPPING BAG
            </button>
            {userInfo ? (
              <button onClick={logout} style={{ cursor: 'pointer' }}>
                LOGOUT
              </button>
            ) : (
              <button onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                LOGIN
              </button>
            )}
          </S.UserMenu>

          <S.LogoSearchWrapper>
            <S.LogoBtn onClick={() => navigate('/')}>
              <S.LogoImg src='/image/logo.png' alt='logo.png' />
            </S.LogoBtn>
            <S.SearchBox>
              <S.SearchInput
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => onCheckEnter(e)}
              />
              <S.SearchIcon onClick={onSearch} />
            </S.SearchBox>
          </S.LogoSearchWrapper>

          <S.MenuList>
            {menuList.map((menu, index) => (
              <S.Menu onClick={() => alert('coming soon')} key={index}>
                {menu}
              </S.Menu>
            ))}
          </S.MenuList>

          {/* </Link> */}
          {/* <div className='nav-menu-area'>
        <ul className='menu'>
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href='#'>{menu}</a>
            </li>
          ))}
        </ul>
        {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
          <div className='search-box landing-search-box '>
            <FontAwesomeIcon icon={faSearch} />
            <input type='text' placeholder='제품검색' onKeyPress={onCheckEnter} />
          </div>
        )}
      </div> */}
        </S.Container>
      </S.Fixed>
    </S.Layout>
  );
};

export default Navbar;
