import PlusCircleIcon from "@heroicons/react/20/solid/PlusCircleIcon"
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { InputHTMLAttributes } from "react"
import { FC } from "react"
import cn from "classnames"

import { forwardRef } from "react"
import { FieldError } from "react-hook-form"

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  error?: FieldError
  className: string
  handleUpload?: (event: ChangeEvent<HTMLInputElement>) => void
}

const ImageInput: FC<ImageInputProps> = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ name, error, className, handleUpload, ...rest }, ref) => {
    const [loading, setLoading] = useState(false)

    return (
      <div className={className}>
        <label
          htmlFor={name}
          className={cn(
            "inline-flex min-w-[128px] cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2  sm:text-sm",
            {
              ["bg-red-300 text-red-900"]: !!error,
              ["bg-cyan-50 text-black"]: !error,
            }
          )}
        >
          <>
            <PlusCircleIcon className="h-5 w-5 fill-black" aria-hidden="true" />
            <span className="ml-1.5 text-sm font-medium leading-5 text-black">Choose file</span>
          </>

          <input
            id={name}
            name={name}
            type="file"
            className="sr-only"
            ref={ref}
            onChange={handleUpload}
            disabled={loading}
            {...rest}
          />
        </label>
      </div>
    )
  }
)

ImageInput.displayName = "ImageInput"

export default ImageInput
