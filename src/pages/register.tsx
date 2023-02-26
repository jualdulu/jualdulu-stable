/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useEffect, useState} from 'react';
import {type GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/react";
import Input from "~/components/atoms/Input";
import InputFile from "~/components/atoms/InputFile";
import Button from "~/components/atoms/Button";
import {api} from "~/utils/api";
import {useRouter} from "next/navigation";
import Notification from "~/components/organisms/Notification";

function Register() {
  const [images, setImages] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();
  const [showError, setShowError] = useState<boolean>(false);
  const {data: session} = useSession();
  const {mutateAsync: register, isLoading} = api.user.register.useMutation();
  // const {mutateAsync: createPresignedUrl} = api.asset.createPresignedUrl.useMutation();
  const router = useRouter();

  // const uploadImage = async (image?: File) => {
  //   if (!image) return;
  //   const {url, key} = await createPresignedUrl({
  //     contentType: image.type,
  //     filename: image.name,
  //   });
  //   await fetch(url, {
  //     method: 'PUT',
  //     body: image,
  //     headers: {'Content-Type': image.type}
  //   })
  //   return key
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return router.replace('/login');
    // let image;
    const form = e.currentTarget;
    // if (images?.[0]) image = await uploadImage(images[0]);
    const data = {
      firstName: (form.elements.namedItem("first-name") as HTMLInputElement)?.value || '',
      lastName: (form.elements.namedItem("last-name") as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value || '',
      // image,
      facebook: (form.elements.namedItem("username") as HTMLInputElement)?.value || '',
      address: (form.elements.namedItem("address") as HTMLInputElement)?.value || '',
      province: (form.elements.namedItem("province") as HTMLInputElement)?.value || '',
      city: (form.elements.namedItem("city") as HTMLInputElement)?.value || '',
      district: (form.elements.namedItem("district") as HTMLInputElement)?.value || '',
      postalCode: (form.elements.namedItem("postal-code") as HTMLInputElement)?.value || '',
    }
    const {code, data: order, ...other} = await register(data);
    console.log(code, order, other);
    if (code === 201 && order) return router.replace('/payment?ref=' + (order?.id || ''));
    setShowError(true)
    return setTimeout(() => setShowError(false), 10000)
  }

  useEffect(() => {
    if (!images?.[0]) return setPreview(null);
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result);
    }
    reader.readAsDataURL(images[0])
  }, [images])

  return (
    <div className="flex-1 xl:overflow-y-auto">
      <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Daftar Akun Baru
          </h2>
        </div>

        <form className="divide-y-gray-200 mt-6 space-y-8 divide-y" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-lbue-gray-900 text-xl font-medium">
                Profile
              </h2>
            </div>

            <Input name="first-name" label="Nama depan" className="sm:col-span-3" required/>

            <Input name="last-name" label="Nama belakang" className="sm:col-span-3"/>

            <Input name="email" label="Email" defaultValue={session?.user.email || ''} className="sm:col-span-3"
                   disabled={!!session?.user.email} required/>

            <Input name="phone" label="Nomor HP" className="sm:col-span-3" required/>

            <InputFile name="image" setFiles={setImages} preview={preview}/>

            <Input name="username" label="Facebook" className="sm: col-span-6">
              <span
                className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  https://www.facebook.com/
              </span>
            </Input>

            <Input type="textarea" name="address" label="Alamat" className="sm:col-span-6"/>

            <Input name="province" label="Provinsi" className="sm:col-span-3"/>

            <Input name="city" label="Kabupaten / Kota" className="sm:col-span-3"/>

            <Input name="district" label="Kecamatan" className="sm:col-span-3"/>

            <Input name="postal-code" label="Kode POS" className="sm:col-span-3"/>
          </div>

          <div className="flex justify-center pt-8">
            <Button type="submit" loading={isLoading}>
              {isLoading ? 'Sedang Memproses' : 'Lanjutkan Pendaftaran'}
            </Button>
          </div>
        </form>
      </div>
      <Notification show={showError} setShow={setShowError}/>
    </div>
  );
}

export default Register;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  const isNewUser = session?.user.role === 'PUBLIC' && !session?.user?.name;
  if (!session || !isNewUser) return {
    redirect: {
      destination: !session ? '/login' : '/member-area',
      permanent: false,
    }
  }
  return {
    props: {
      session,
    }
  }
}