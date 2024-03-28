import React, { useState, useRef, ChangeEvent } from "react"
import { Button } from "components/Button/Button"

const Steganography: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [message, setMessage] = useState<string>("")
  const [hiddenMessage, setHiddenMessage] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const canvas = canvasRef.current
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
    if (canvasRef.current && message) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        const data = imageData.data
        // Append the end-of-message marker to the message before encoding
        let messageBinary = (message + END_OF_MESSAGE)
          .split("")
          .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
          .join("")
        let dataIndex = 0

        for (let i = 0; i < messageBinary.length; i++) {
          const bit = parseInt(messageBinary[i])
          data[dataIndex] = (data[dataIndex] & ~1) | bit // Encode in the least significant bit
          dataIndex += 4 // Move to the next pixel's blue component
        }

        ctx.putImageData(imageData, 0, 0)
        setHiddenMessage("Message encoded successfully.")
      }
    }
  }

  const decodeMessage = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
        const data = imageData.data
        let binaryMessage = ""
        let charBinary = ""

        for (let i = 0; i < data.length; i += 4) {
          charBinary += data[i] & 1 // Extract the least significant bit
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

        setHiddenMessage(binaryMessage)
      }
    }
  }

  const downloadImage = () => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream")
      const link = document.createElement("a")
      link.download = "coded-image.png"
      link.href = image
      link.click()
    }
  }

  return (
    <div className="mx-auto p-4">
      <input type="file" onChange={handleImageChange} className="mb-2" />
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Message to hide"
        className="mb-2 rounded border p-1"
      />
      <Button onClick={encodeMessage} className="bg-blue-500">
        Encode
      </Button>

      <Button onClick={downloadImage} className="bg-red-500">
        Download Image
      </Button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div className="p-4">
        <input type="file" onChange={handleImageChange} className="mb-2" />

        <Button onClick={decodeMessage} className="bg-green-500">
          Decode
        </Button>

        {hiddenMessage && <div className="mt-2">Hidden Message: {hiddenMessage}</div>}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
  )
}

export default Steganography
