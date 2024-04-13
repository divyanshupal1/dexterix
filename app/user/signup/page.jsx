"use client"
import React, { useEffect } from 'react'
import {signInWithPhoneNumber ,RecaptchaVerifier , create  } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { doc, setDoc } from "firebase/firestore"; 
  import { db } from '@/lib/firebase';

const Page = () => {

    const [phone, setPhone] = React.useState('');
    const [code, setCode] = React.useState('');
    const [loading,setLoading] = React.useState(false)
    const [showOTP, setShowOTP] = React.useState(false)
    const [type,setType] = React.useState('individual')

    console.log(code)

    const [user,setUser] = React.useState({
        username:"",address:"",pincode:"",city:"",state:"",phone:""
    })
     
    const {toast} = useToast()

    useEffect(() =>{        
        auth.useDeviceLanguage()
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              console.log('captcha solved')
            }
        });
    })
    // console.log(type)
    function onSignInSubmit(){
        setLoading(true)
        var appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${user.phone}`, appVerifier)
        .then((confirmationResult) => {
            setShowOTP(true)
            setLoading(false)
            toast({
                title:"Code sent to "+user.phone,
            })
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            console.log(error)
            toast({
                title:"Some error occured",
                variant: "destructive"
            })
        });
    }

    async function saveUser(users){
        try{
            await setDoc(doc(db, "users", users.uid),{...user,uid:users.uid,type:type});
            setLoading(false)
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    function confirmOTP(){
        setLoading(true)
        confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            toast({
                title:"Login Succcess"
            })
            saveUser(result.user)
            console.log(user)
        }).catch((error) => {
            toast({
                title:"Incorrect Code",
                variant: "destructive"
            })
            setLoading(false)
        });
    }
    return (
        <div className='w-full'>
            <div className='text-center'>
                <p className='text-2xl font-bold' >Sign Up</p>
            </div>
            {!showOTP && <div className='flex flex-col gap-y-4 mt-11 h-fit'>
                <div className='space-y-2'>
                    <Label>Username</Label>
                    <Input type="text" 
                        value={user?.username} 
                        onChange={(e)=>(
                            setUser((prev)=>({...prev,username:e.target.value}))
                        )} 
                    />
                </div>
                <div className='space-y-2'>
                    <Label>Phone Number</Label>
                    <Input type="text" 
                        value={user?.phone} 
                        onChange={(e)=>(
                            setUser((prev)=>(e.target.value.length<=10 &&{...prev,phone:e.target.value}))
                        )}
                    />
                </div>
                <div className='space-y-2'>
                    <Label>Address</Label>
                    <Input type="text" 
                        value={user?.address} 
                        onChange={(e)=>(
                            setUser((prev)=>({...prev,address:e.target.value}))
                        )} 
                    />
                </div>
                <div className='space-y-2'>
                    <Label>Pincode</Label>
                    <Input type="text" 
                        value={user?.pincode} 
                        onChange={(e)=>(
                            setUser((prev)=>({...prev,pincode:e.target.value}))
                        )} 
                    />
                </div>
                <div className='space-y-2'>
                    <Label>City</Label>
                    <Input type="text" 
                        value={user?.city} 
                        onChange={(e)=>(
                            setUser((prev)=>({...prev,city:e.target.value}))
                        )} 
                    />
                </div>
                <div className='space-y-2'>
                    <Label>State</Label>
                    <Input type="text" 
                        value={user?.state} 
                        onChange={(e)=>(
                            setUser((prev)=>({...prev,state:e.target.value}))
                        )} 
                    />
                </div>                
                <div className='space-y-2'>
                    <Label>Who are you ?</Label>
                    <TypeToggle type={type} change={setType}/>
                </div>                
            </div>}
            {
                showOTP && 
                <div className='flex flex-col gap-y-4 mt-11 h-fit'>
                    <div className='space-y-2'>
                        <Label>Enter OTP</Label>
                        <InputOTP maxLength={6}
                            value={code}
                            onChange={(value) => setCode(value)}
                        >
                            <InputOTPGroup className={`gap-x-4`}>
                                <InputOTPSlot index={0} />
                                {/* <InputOTPSeparator /> */}
                                <InputOTPSlot index={1} />
                                {/* <InputOTPSeparator /> */}
                                <InputOTPSlot index={2} />
                                {/* <InputOTPSeparator /> */}
                                <InputOTPSlot index={3} />
                                {/* <InputOTPSeparator /> */}
                                <InputOTPSlot index={4} />
                                {/* <InputOTPSeparator /> */}
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </div>
            }
            <div id="getotp" className='hidden opacity-0'></div>
            {
              showOTP ? <Button id="sign-in-button" loading={loading} onClick={confirmOTP} className="w-full mt-8" >Submit</Button> :  <Button id="sign-in-button" loading={loading} onClick={onSignInSubmit} className={`w-full mt-8 ${showOTP?"hidden":""}`} >Continue</Button>
            }
        </div>
    )
}

export default Page

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaBuildingNgo } from "react-icons/fa6";

function TypeToggle({type,change}) {
    return (
      <ToggleGroup className="w-full flex justify-between" type="single" value={type} onValueChange={(val)=>change(val)}>
        <ToggleGroupItem value="doctor" className="grow-0 w-[80px] h-[80px]" aria-label="Toggle doctor">
          <div className='flex flex-col gap-y-2 items-center p-2 '>
            <div className='scale-150'><FaUserDoctor/></div>
            <div>Doctor</div>
          </div>
        </ToggleGroupItem>
        <ToggleGroupItem value="individual" className="grow-0 w-[80px] h-[80px]" aria-label="Toggle individual">
          <div className='flex flex-col gap-y-2 items-center p-2'>
            <div className='scale-150'><FaUser/></div>
            <div>Individual</div>
          </div>
        </ToggleGroupItem>
        <ToggleGroupItem value="ngo" className="grow-0 w-[80px] h-[80px]" aria-label="Toggle individual">
        <div className='flex flex-col gap-y-2 items-center p-2'>
            <div className='scale-150'><FaBuildingNgo/></div>
            <div>NGO</div>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    )
  }