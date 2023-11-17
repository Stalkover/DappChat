import React, { useState, useContext } from 'react'
import Image from "next/image";

import Style from "./Filter.module.css"
import images from "../../assets"
import {ChatAppContext} from "../../Context/ChatAppContext"
import {Model} from "../index";

const Filter = () => {

  const {account, addFriends} = useContext(ChatAppContext);

  //USESTATE
  const [addFriend, setAddFriend] = useState(false)
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          {/* <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}/>
            <input type="text" placeholder="search..."/>
          </div> */}
        </div>
        {/* <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear}
              alt="clear"
              width={20}
              height={20}
            />
            CLEAR CHAT
          </button>
        </div> */}
      </div>
      {/* //MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend} 
          title="Welcome to" 
          head="BlockChat"
          info="You are one step away from entering the blockchain decentralized chat experience!"
          smallInfo="Select your friend name and address"
          image={images.hero}
          functionName={addFriends}
          />
        </div>
      )}
    </div>
  )
}

export default Filter