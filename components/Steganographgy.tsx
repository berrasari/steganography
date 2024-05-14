import React from "react"
import Decode from "./Decode"
import Encode from "./Encode"

const Steganographgy = ({ activeTab }) => {
  return (
    <div className=" mx-auto flex flex-row">
      <div>{activeTab === "encode" ? <Encode /> : <Decode />}</div>
    </div>
  )
}

export default Steganographgy
