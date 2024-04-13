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
                <p className='text-2xl font-bold' >Sign In</p>
            </div>
            <div className='flex flex-col gap-y-4 mt-11 h-fit'>
                <div className='space-y-2'>
                    <Label>Phone Number</Label>
                    <Input type="text" value={phone} onChange={(e)=>{e.target.value.length<=10 && setPhone(e.target.value)}}/>
                </div>
                <div className='space-y-2'>
                    <Label>Enter OTP</Label>
                    <InputOTP maxLength={6}>
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
            <div id="getotp" className='hidden opacity-0'></div>
            {
                <Button id="sign-in-button"  onClick={onSignInSubmit} className="w-full mt-8" >Continue</Button>
            }
        </div>
    )
}

export default Page