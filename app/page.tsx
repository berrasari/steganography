"use client"
import { Metadata } from "next"
import { Button } from "components/Button/Button"
import Steganography from "components/Steganographgy"

export default function Web() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Steganography
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Steganografi, tespit edilmemek için bilgileri başka bir mesaj veya fiziksel bir nesne içine gizleme
              uygulamasıdır. Steganografi; metin, resim, video veya ses içeriği dâhil olmak üzere neredeyse her tür
              dijital içeriği gizlemek için kullanılabilir. Bu gizli veriler hedefine ulaştıktan sonra çıkarılır.
            </p>
            <Button href="https://github.com/Blazity/next-enterprise" className="mr-3">
              Get started
            </Button>
            <Steganography />
          </div>
        </div>
      </section>
    </>
  )
}
