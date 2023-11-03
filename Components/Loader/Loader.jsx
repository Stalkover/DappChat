import React from 'react'
import Image from "next/image";

//INTERNAL IMPORT
import Style from './Loader.module.css'
import images from "../../assets";

const Loader = () => {
  return (
    <div className={Style.Loader}>Loader</div>
  )
}

export default Loader