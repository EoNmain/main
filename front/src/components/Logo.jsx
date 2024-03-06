import '../output.css';
import { React } from 'react';
import Eonlogo from '../assets/Eonlogo.png';

export default function logo() {
  return (
    <a
      href="/"
      className="-m-1.5 p-1.5 display:flex justify-content:center align-items:center"
    >
      <img className="h-25 w-auto" src={Eonlogo} alt="" />
    </a>
  );
}
