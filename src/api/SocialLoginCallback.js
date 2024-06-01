import React, { useEffect } from 'react';

export default function SocialLoginCallback() {
  useEffect(() => {
    window.opener.postMessage({
      type: 'loginSuccess',
    });
    window.close();
  }, []);

  return <div>Loading...</div>;
}
