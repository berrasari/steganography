/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useRef, useState } from "react"
import { Button } from "components/Button/Button"
import ImageInput from "./ImageInput"
import Upload from "../public/upload.jpeg"

const Decode: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(Upload.src)
  const [hiddenMessage, setHiddenMessage] = useState<string>("")
  const decodeRef = useRef<HTMLCanvasElement>(null)

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

  const drawImageOnCanvas = (imageSrc: string) => {
    const canvas = decodeRef.current
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

  const decodeMessage = () => {
    if (decodeRef.current) {
      const ctx = decodeRef.current.getContext("2d")
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, decodeRef.current.width, decodeRef.current.height)
        const data = imageData.data
        let binaryMessage = ""
        let charBinary = ""

        for (let i = 0; i < data.length; i += 4) {
          if (typeof data[i] === "number") {
            let temp = data[i] as number
            charBinary += temp & 1 // Extract the least significant bit
            if (charBinary.length === 8) {
              const character = String.fromCharCode(parseInt(charBinary, 2))
              binaryMessage += character
              charBinary = "" // Reset for the next character
              // Check for the end-of-message marker
              if (binaryMessage.includes(END_OF_MESSAGE)) {
                // Extract the actual message, excluding the end-of-message marker
                binaryMessage = binaryMessage.substring(0, binaryMessage.indexOf(END_OF_MESSAGE))
                break // Stop decoding
              }
            }
          }
        }

        setHiddenMessage(binaryMessage)
      }
    }
  }

  return (
    <div id="image" className="flex flex-col items-center justify-center ">
      <div className="relative flex h-72 w-72 flex-col items-center justify-center rounded-md border border-gray-300 bg-white ">
        {image && (
          <img
            src={image as string}
            alt="Uploaded"
            className="h-60 w-60 max-w-full border border-gray-300 object-cover"
          />
        )}
        <ImageInput className="absolute bottom-2" name="file" handleUpload={handleImageChange} />
      </div>
      <Button
        size={"sm"}
        onClick={decodeMessage}
        className="my-3 w-36 rounded-md border border-gray-300 bg-white text-green-500 shadow-sm hover:border-gray-500 hover:text-green-700"
      >
        Decode
      </Button>
      {hiddenMessage && (
        <div id="hidden-message" className="bg barder-gray-300 w-96 rounded-md border">
          <h3 className="max-w-2xl p-2 text-lg font-extrabold leading-none">Hidden Message:</h3>
          <p className="p-2">{hiddenMessage}</p>
        </div>
      )}

      <canvas ref={decodeRef} style={{ display: "none" }}></canvas>
    </div>
  )
}

export default Decode
