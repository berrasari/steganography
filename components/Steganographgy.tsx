import React from "react"
import Decode from "./Decode"
import Encode from "./Encode"

interface SteganographyProps {
  activeTab: string
}

const Steganography: React.FC<SteganographyProps> = ({ activeTab }) => {
  return (
    <div className="mx-auto flex flex-row">
      <div>{activeTab === "encode" ? <Encode /> : <Decode />}</div>
    </div>
  )
}

export default Steganography
