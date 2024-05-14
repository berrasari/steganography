"use client"
import { Metadata } from "next"
import { Button } from "components/Button/Button"
import Steganography from "components/Steganographgy"
import { useState } from "react"

export default function Web() {
  const [activeTab, setActiveTab] = useState("encode")
  return (
    <>
      <section className="h-full bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl p-4 text-center lg:py-4">
          <div className="mx-auto flex flex-col items-center justify-center place-self-center">
            <h1 className="mx-auto mb-6 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Steganography
            </h1>
            <p className="mx-auto  max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg  lg:text-xl">
              Steganografi, tespit edilmemek için bilgileri başka bir mesaj veya fiziksel bir nesne içine gizleme
              uygulamasıdır. Steganografi; metin, resim, video veya ses içeriği dâhil olmak üzere neredeyse her tür
              dijital içeriği gizlemek için kullanılabilir. Bu gizli veriler hedefine ulaştıktan sonra çıkarılır.
            </p>
            <div className="my-4 flex flex-row gap-2">
              <Button
                className={`w-40  bg-black ${activeTab === "encode" ? "bg-black" : "opacity-50 hover:opacity-75"}`}
                size={"sm"}
                onClick={() => setActiveTab("encode")}
              >
                Encode
              </Button>
              <Button
                className={`w-40 bg-black ${activeTab === "decode" ? "bg-black" : "opacity-50 hover:opacity-75"}`}
                size={"sm"}
                onClick={() => setActiveTab("decode")}
              >
                Decode
              </Button>
            </div>

            <Steganography activeTab={activeTab} />
          </div>
        </div>
      </section>
    </>
  )
}
