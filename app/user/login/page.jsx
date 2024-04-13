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
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useRouter } from 'next/navigation';

const Page = () => {

    const router = useRouter()

    const [phone, setPhone] = React.useState('');
    const [code, setCode] = React.useState('');
    const [loading,setLoading] = React.useState(false)
    const [showOTP, setShowOTP] = React.useState(false)

    const {toast} = useToast()

    useEffect(() =>{        
        auth.useDeviceLanguage()
        var appVerifier = window.recaptchaVerifier;
        if(!appVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                  console.log('captcha solved')
                }
            });
        }        
    })

    function onSignInSubmit(){
        setLoading(true)
        var appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${phone}`, appVerifier)
        .then((confirmationResult) => {
            setShowOTP(true)
            setLoading(false)
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            console.log(error)
            toast({
                title:error.message
            })
            setLoading(false)
        });
    }

    function confirmOTP(){
        setLoading(true)
        confirmationResult.confirm(code).then((result) => {
           toast({
            title:"Login Success"
           })
           setLoading(false)
           router.push(`/home`)
        }).catch((error) => {
            toast({
                title:"Code incorrect",
                variant:"destructive"
            })
            setLoading(false)
        });
    }
    return (
        <div className='w-full'>
            <div className='text-center'>
                <p className='text-2xl font-bold' >Sign In</p>
            </div>
            <div className='flex flex-col gap-y-4 mt-11 h-fit'>
                {!showOTP && <div className='space-y-2'>
                    <Label>Phone Number</Label>
                    <Input type="text" value={phone} onChange={(e)=>{e.target.value.length<=10 && setPhone(e.target.value)}}/>
                </div>}
                {showOTP && <div className='space-y-2'>
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
                </div>}
            </div>
            <div id="getotp" className='hidden opacity-0'></div>
            {
              showOTP ? <Button id="sign-in-button" loading={loading} onClick={confirmOTP} className="w-full mt-8" >Submit</Button> :  <Button id="sign-in-button" loading={loading} onClick={onSignInSubmit} className={`w-full mt-8 ${showOTP?"hidden":""}`} >Continue</Button>
            }
        </div>
    )
}

export default Page