import { Facebook, Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <section className='  p-1 md:p-2 '>
            <div className='bg-zinc-900 mx-auto p-6 lg:p-8 max-w-7xl border border-mySecondary-600  rounded-3xl'>
                <div className='grid md:grid-cols-2 '>

                    <div className='my-4'>
                        {/* <h3 className='my-1 md:my-3 font-extrabold text-xl relative bg-gradient-to-tr from-mySecondary-500 to-mySecondary-800 text-transparent bg-clip-text'>Stream</h3> */}
                        <div className="text-2xl font-bold">
                            <span className="text-mySecondary-400">Stream</span>Snap
                        </div>
                        <Link href={'/'}><p className='text-gray-400 md:my-1'>Home</p></Link>
                        <Link href={'/'}><p className='text-gray-400 md:my-1'>Privacy Policy</p></Link>
                    </div>

                    <div className='my-4'>
                        <h3 className='my-1 md:my-3 font-semibold text-lg md:text-xl relative text-white'>Contact Us</h3>
                        <p className='text-gray-400 flex items-center gap-x-2 text-sm md:text-base'> <Phone size={15} /> +92 012 3456789</p>
                        <p className='text-gray-400 flex items-center gap-x-2 text-sm md:text-base'> <Mail size={15} />abc@xyz.com</p>

                        <div className='flex mt-5 gap-x-3 md:gap-x-4'>
                            <div className='bg-gradient-to-br from-mySecondary-500 to-mySecondary-800 rounded-lg p-1'><Linkedin className='h-5 w-5  md:h-6 md:w-6' /></div>
                            <div className='bg-gradient-to-br from-mySecondary-500 to-mySecondary-800 rounded-lg p-1'><Github className='h-5 w-5  md:h-6 md:w-6' /></div>
                            <div className='bg-gradient-to-br from-mySecondary-500 to-mySecondary-800 rounded-lg p-1'><Facebook className='h-5 w-5  md:h-6 md:w-6' /></div>
                            <div className='bg-gradient-to-br from-mySecondary-500 to-mySecondary-800 rounded-lg p-1'><Twitter className='h-5 w-5  md:h-6 md:w-6' /></div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex justify-center items-center py-1 lg:py-2">
                <p className="text-gray-500 text-sm sm:text-base">
                    Copyright StreamSnap 2025  All Rights Reserved
                </p>
            </div>
        </section>
    )
}

export default Footer