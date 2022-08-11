/*
 * @Author: xieyejian
 * @Date: 2022-06-29 13:21:12
 * @Description: 按钮组件
 */

import { Button } from 'antd';
import React, { useState } from 'react';
import logo from './imgs/sys-logo.svg';
import icon from './imgs/1.png';
import Icon from '@ant-design/icons';
import { ReactComponent as Logo } from './imgs/sys-logo.svg';
interface momButtonProps {
  text: string;
}

const momButton: React.FC<momButtonProps> = ({ text }) => {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount((count) => ++count);
  };
  return (
    <>
      <img src={icon} alt="" />
      <img src={logo} alt="" />
      <Icon component={Logo} style={{ fontSize: 20 }} />
      <Button onClick={onClick}>
        {count}-{text}
      </Button>
    </>
  );
};

export default momButton;
