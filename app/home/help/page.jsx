"use client"

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { MdOutlineCamera } from "react-icons/md";
import { storage } from "@/lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL , uploadBytes ,uploadString} from "firebase/storage";
import { v4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/lib/firebase';




// const blobUrl = URL.createObjectURL(blob);

const videoConstraints = {
  facingMode: "environment" 
};

const Help = () => {
  const {toast}=useToast()
  const [image,setImage] = React.useState(null)
  const [imageUrl,setImageUrl] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const webcamRef = React.useRef(null);


  const capture = React.useCallback(
    async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      fetch(imageSrc)
      .then(res => res.blob())
      .then(setImage)
      // setImage(imageSrc)
      
    },
    [webcamRef]
  );

  useEffect(()=>{
    image!=null && uploadImage()
  },[image])

  async function uploadImage(){
    const location = 'images/'+v4()+".jpeg"
    const imagesRef = ref(storage, location);
    uploadBytes(imagesRef, image).then(async (snapshot) => {
      toast({
        title:"Picture Uploaded !"
      })
      getImgUrl(location)      
    });    
  }

  async function getImgUrl(src){
    getDownloadURL(ref(storage, src))
    .then((url) => {
      // fetch(url).then((res)=>console.log())
      setImageUrl(url)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  const [info,setInfo] = React.useState({
    name:"",address:"",pincode:"",city:"",state:"",phone:""
  })
  async function submit(){
    setLoading(true)
    var id = v4()
    try{
      await setDoc(doc(db, "alerts",id ),{info,id:id,img:imageUrl,reward:'d6YNZuqCkyk9IW2JSP0u'});
      setLoading(false)
      toast({
        title:"Submitted"
      })
      setInfo({
        name:"",address:"",pincode:"",city:"",state:"",phone:"",description:""
      })
    }catch(e){
        console.log(e)
        setLoading(false)
    }
    
  }

  return (
    <div className="w-full">
      {/* {
      // !imageUrl && 
      <div className="w-full h-full ">
        <div className="rounded-lg overflow-hidden">
          <Webcam
            audio={false}
            height={1280}
            ref={webcamRef}
            width={720}
            screenshotFormat="image/jpeg"
            className="w-full h-full"
            videoConstraints={videoConstraints}
          />
        </div>
        <div className="w-full h-full min-h-[100px] flex justify-center items-center">
          <Button onClick={capture} variant="secondary" className="mx-auto w-auto scale-[1.5]">
            <div className="scale-[3]"><MdOutlineCamera/></div>
          </Button>
        </div>
      </div>
      }
      
      {
      imageUrl&& */}
      <div className="w-full space-y-3">
        {/* <img id="myimg" src={imageUrl} alt="image" className="w-full" /> */}
        <div className='space-y-2'>
                    <Label>Animal Name</Label>
                    <Input type="text" 
                        value={info?.name} 
                        onChange={(e)=>(
                            setInfo((prev)=>({...prev,name:e.target.value}))
                        )} 
                    />
        </div>
        <div className='space-y-2'>
                    <Label>Description</Label>
                    <Input type="text" 
                        value={info?.description} 
                        onChange={(e)=>(
                            setInfo((prev)=>({...prev,description:e.target.value}))
                        )} 
                    />
        </div>
        <div className='space-y-2'>
                    <Label>Contact Number</Label>
                    <Input type="text" 
                        value={info?.phone} 
                        onChange={(e)=>(
                            setInfo((prev)=>(e.target.value.length<=10 &&{...prev,phone:e.target.value}))
                        )}
                    />
        </div>
        <div className='space-y-2'>
                    <Label>Address</Label>
                    <Input type="text" 
                        value={info?.address} 
                        onChange={(e)=>(
                            setInfo((prev)=>({...prev,address:e.target.value}))
                        )} 
                    />
        </div>
        <div className='space-y-2'>
                    <Label>Pincode</Label>
                    <Input type="text" 
                        value={info?.pincode} 
                        onChange={(e)=>(
                            setInfo((prev)=>({...prev,pincode:e.target.value}))
                        )} 
                    />
        </div>
        <div className='space-y-2'>
                    <Label>City</Label>
                    <Input type="text" 
                        value={info?.city} 
                        onChange={(e)=>(
                            setInfo((prev)=>({...prev,city:e.target.value}))
                        )} 
                    />
        </div>
        <div className='space-y-2'>
                    <Label>State</Label>
                    <Input type="text" 
                        value={info?.state} 
                        onChange={(e)=>(
                            setInfo((prev)=>({...prev,state:e.target.value}))
                        )} 
                    />
        </div> 
        <div className='space-y-2'>
          <Label>Image</Label>
          <Input 
            type="file" 
            accept="image/jpeg"
                        // value={image} 
            onChange={(e)=>(
              setImage(e.target.files[0])
            )} 
        />
        </div> 
        <Button className="w-full mt-4" loading={loading} disabled={loading} onClick={submit} >Submit</Button>                

      </div>
      {/* } */}
    </div>
  )
}

export default Help