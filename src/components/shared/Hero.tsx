import Image from 'next/image'
import PageWrapper from "./wrappers/PageWrapper"
import { ArrowRight } from 'lucide-react'
import H1 from './texts/H1'

export default function Hero() {
    return (
        <section className=" overflow-hidden  py-20  relative">
            <div className='absolute inset-0 w-1/2 h-10 mx-auto bg-mySecondary-400 opacity-70 rounded-b-full blur-2xl z-0' />
            <div className='absolute inset-0 w-1/2 h-64 mx-auto bg-gradient-to-t from-myPrimary/50 to-mySecondary-400 opacity-50 rounded-b-full blur-3xl backdrop:blur-lg z-0' />
            {/* <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div> */}
            <div className='absolute inset-0 w-[30%] h-36 mx-auto top-36 bg-mySecondary-400 opacity-30 rounded-b-full blur-3xl' />

            <PageWrapper>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center bg-transparent z-10 relative">
                    <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 ">                       
                        <H1>
                            AI-Powered Instagram Automation
                            <span className="block text-mySecondary-400">Smarter Growth, Seamless Engagement!</span>
                        </H1>

                        <p className=" text-gray-400 text-center lg:text-left mb-8">
                            Our platform simplifies your Instagram management by automating responses, optimizing your content
                            strategy, and enhancing audience engagement. Whether you're building a personal
                            brand or growing your business, achieve smarter growth and create
                            meaningful connections effortlessly with our intelligent tools.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="px-8 py-3 bg-mySecondary-400 hover:bg-mySecondary-500 hover:text-white dark:hover:text-black font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button className="px-8 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 border border-mySecondary-500  font-semibold rounded-full transition duration-300 ease-in-out">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-transparent z-10 relative">

                        <div className='flex h-full w-full gap-4 '>
                            <div className='grid grid-rows-[40%,40%,20%] gap-x-4 gap-y-1 '>
                                <div className=' w-full h-full'>
                                    <Image src={'/images/person-1.webp'} alt='an image of instagram creator' height={1000} width={1000} className='object-cover  w-full h-full rounded-l-full border-l-4 border-l-mySecondary-500' />
                                </div>
                                <div className=' w-full h-full'>
                                    <Image src={'/images/person-2.webp'} alt='an image of instagram creator' height={1000} width={1000} className='object-cover   w-full h-full rounded-r-full  border-r-4 border-r-mySecondary-500' />
                                </div>

                                <div></div> {/* empty div to take the space */}
                            </div>

                            <div className='grid grid-rows-[20%,40%,40%] gap-x-4 gap-y-1'>
                                <div></div> {/* empty div  to take the space*/}

                                <div className=' w-full h-full'>
                                    <Image src={'/images/person-3.webp'} alt='an image of instagram creator' height={1000} width={1000} className='object-cover  w-full h-full rounded-l-full border-l-4 border-l-mySecondary-500' />
                                </div>
                                <div className=' w-full h-full'>
                                    <Image src={'/images/person-4.webp'} alt='an image of instagram creator' height={1000} width={1000} className='object-cover   w-full h-full rounded-r-full border-r-4 border-r-mySecondary-500' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>

        </section>
    )
}

