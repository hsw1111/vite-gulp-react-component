/*
 * @Description: 
 * @Author: huangshiwen
 * @Date: 2022-08-10 15:16:03
 */
/// <reference types="vite/client" />

// declare module 'my-components'
declare module '*.png';
declare module '*.jpg';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}