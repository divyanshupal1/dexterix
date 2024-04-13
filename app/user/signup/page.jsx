"use client"
import React, { useEffect } from 'react'
import {signInWithPhoneNumber ,RecaptchaVerifier  } from "firebase/auth";
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

const Page = () => {

    const [phone, setPhone] = React.useState('');
    const [code, setCode] = React.useState('');
    const [loading,setLoading] = React.useState(false)

    const [user,setUser] = React.useState({
        username:"",address:"",pincode:"",city:"",state:""
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
    console.log(user)
    function onSignInSubmit(){
        var appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${phone}`, appVerifier)
        .then((confirmationResult) => {
            alert('code sent')
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            console.log(error)
            toast({
                title:error.message
            })
        });
    }

    function confirmOTP(){
        confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            alert("confirmed")
        }).catch((error) => {
            alert("code wrong")
        });
    }
    return (
        <div className='w-full'>
            <div className='text-center'>
                <p className='text-2xl font-bold' >Sign Up</p>
            </div>
            {<div className='flex flex-col gap-y-4 mt-11 h-fit'>
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
                    <Input type="text" value={phone} onChange={(e)=>{e.target.value.length<=10 && setPhone(e.target.value)}}/>
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
            </div>}
            <div id="getotp" className='hidden opacity-0'></div>
            {
                <Button id="sign-in-button"  onClick={onSignInSubmit} className="w-full mt-8" >Continue</Button>
            }
        </div>
    )
}

export default Page