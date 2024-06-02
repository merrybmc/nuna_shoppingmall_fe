import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faBox, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useLogoutMutation } from './../api/hooks/SignApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfoAtom } from '../utils/store';

const Navbar = ({ user }) => {
  const isMobile = window.navigator.userAgent.indexOf('Mobile') !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = [
    '여성',
    'Divided',
    '남성',
    '신생아/유아',
    '아동',
    'H&M HOME',
    'Sale',
    '지속가능성',
  ];

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  let [width, setWidth] = useState(0);

  let navigate = useNavigate();

  const queryClient = useQueryClient();

  const onCheckEnter = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        return navigate('/');
      }
      navigate(`?name=${event.target.value}`);
    }
  };

  const { data: queryUserInfo, isSuccess } = useGetUserInfoQuery('/user');
  const { mutate: logoutMutate } = useLogoutMutation();

  useEffect(() => {
    if (isSuccess && queryUserInfo) {
      setUserInfo(queryUserInfo.data);
    }
  }, [isSuccess, queryUserInfo, setUserInfo]);

  // 로그아웃
  const logout = () => {
    logoutMutate(
      { path: '/auth/logout' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['getUserInfo']);
          setUserInfo(null);
          navigate('/');
        },
        onError: () => {
          alert('로그아웃 실패');
        },
      }
    );
  };

  return (
    <div>
      {showSearchBox && (
        <div className='display-space-between mobile-search-box w-100'>
          <div className='search display-space-between w-100'>
            <div>
              <FontAwesomeIcon className='search-icon' icon={faSearch} />
              <input type='text' placeholder='제품검색' onKeyPress={onCheckEnter} />
            </div>
            <button className='closebtn' onClick={() => setShowSearchBox(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
      <div className='side-menu' style={{ width: width }}>
        <button className='closebtn' onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className='side-menu-list' id='menu-list'>
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      {user && user.level === 'admin' && (
        <Link to='/admin/product?page=1' className='link-area'>
          Admin page
        </Link>
      )}
      <div className='nav-header'>
        <div className='burger-menu hide'>
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className='display-flex'>
            {userInfo ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FontAwesomeIcon icon={faUser} />
                <span>{userInfo.name}</span>
                <div onClick={logout} className='nav-icon'>
                  {!isMobile && <span style={{ cursor: 'pointer' }}>로그아웃</span>}
                </div>
                <button onClick={() => navigate('/mypage/info')}>마이페이지</button>
              </div>
            ) : (
              <div onClick={() => navigate('/login')} className='nav-icon'>
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: 'pointer' }}>로그인</span>}
              </div>
            )}
            {/* <div onClick={() => navigate('/cart')} className='nav-icon'> */}
            {/* <FontAwesomeIcon icon={faShoppingBag} /> */}
            {/* {!isMobile && (
                <span style={{ cursor: 'pointer' }}>{`쇼핑백(${cartItemCount || 0})`}</span>
              )} */}
            {/* </div> */}
            {/* <div onClick={() => navigate('/account/purchase')} className='nav-icon'> */}
            {/* <FontAwesomeIcon icon={faBox} /> */}
            {/* {!isMobile && <span style={{ cursor: 'pointer' }}>내 주문</span>} */}
            {/* </div> */}
            {/* {isMobile && ( */}
            {/* <div className='nav-icon' onClick={() => setShowSearchBox(true)}> */}
            {/* <FontAwesomeIcon icon={faSearch} /> */}
            {/* </div> */}
            {/* )} */}
          </div>
        </div>
      </div>

      <div className='nav-logo'>
        <Link to='/'>
          <img width={100} src='/image/hm-logo.png' alt='hm-logo.png' />
        </Link>
      </div>
      <div className='nav-menu-area'>
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
      </div>
    </div>
  );
};

export default Navbar;
