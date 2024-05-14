/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useRef, useState } from "react"
import { Button } from "components/Button/Button"
import ImageInput from "./ImageInput"
import Upload from "../public/upload.jpeg"

const Encode: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(Upload.src)
  const [message, setMessage] = useState<string>("")
  const [hiddenMessage, setHiddenMessage] = useState<string>("")
  const encodeRef = useRef<HTMLCanvasElement>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        drawImageOnCanvas(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    let message = event.target.value
    message = message.toUpperCase()
    setMessage(message)
  }

  const drawImageOnCanvas = (imageSrc: string) => {
    const canvas = encodeRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx) {
      const img = new Image()
      img.onload = () => {
        if (canvas) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
        }
      }
      img.src = imageSrc
    }
  }

  const END_OF_MESSAGE = "$$$$$$" // Define an end-of-message marker

  const encodeMessage = () => {
    if (encodeRef.current && message) {
      const ctx = encodeRef.current.getContext("2d")
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, encodeRef.current.width, encodeRef.current.height)
        const data: Uint8ClampedArray = imageData.data
        // Append the end-of-message marker to the message before encoding
        let messageBinary = (message + END_OF_MESSAGE)
          .split("")
          .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
          .join("")
        let dataIndex = 0

        for (let i = 0; i < messageBinary.length; i++) {
          const bit = parseInt(messageBinary[i] as string)
          let temp = data[dataIndex] as number
          data[dataIndex] = (temp & ~1) | bit // Encode in the least significant bit
          dataIndex += 4 // Move to the next pixel's blue component
        }

        ctx.putImageData(imageData, 0, 0)
        setHiddenMessage("Message encoded successfully.")
      }
    }
  }

  const downloadImage = () => {
    if (encodeRef.current) {
      const image = encodeRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream")
      const link = document.createElement("a")
      link.download = "coded-image.png"
      link.href = image
      link.click()
    }
  }

  return (
    <div id="image" className="flex flex-col items-center justify-center ">
      <div className="relative flex h-72 w-72 flex-col items-center justify-center rounded-md border border-gray-300  bg-white ">
        {image && (
          <img
            src={image as string}
            alt="Uploaded"
            className=" h-60 w-60 max-w-full border border-gray-300 object-cover "
          />
        )}
        <ImageInput className="absolute bottom-2" name="file" handleUpload={handleImageChange} />
      </div>
      <div className="my-3 flex flex-row items-center gap-1 ">
        <Button
          id="image-button"
          size={"sm"}
          onClick={encodeMessage}
          className={` w-36 rounded-md  border border-gray-300 bg-white text-blue-500 hover:border-gray-500 hover:text-blue-700`}
        >
          {hiddenMessage ? "Encoded" : "Encode"}
        </Button>
        <Button
          size={"sm"}
          onClick={downloadImage}
          className="w-36 rounded-md border border-gray-300 bg-white text-red-500 shadow-sm hover:border-gray-500  hover:text-red-700"
        >
          Download
        </Button>
      </div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Message to hide"
        className="  w-full rounded-md border border-gray-300 p-1"
      />
      <canvas ref={encodeRef} style={{ display: "none" }}></canvas>{" "}
    </div>
  )
}

export default Encode
