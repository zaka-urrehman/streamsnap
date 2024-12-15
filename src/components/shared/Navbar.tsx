
"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Menu, X } from 'lucide-react'
import PageWrapper from "./wrappers/PageWrapper"

export default function Navbar() {
    const [servicesOpen, setServicesOpen] = useState(false)
    const [pagesOpen, setPagesOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const servicesTimer = useRef<NodeJS.Timeout | null>(null)
    const pagesTimer = useRef<NodeJS.Timeout | null>(null)

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    useEffect(() => {
        return () => {
            if (servicesTimer.current) clearTimeout(servicesTimer.current)
            if (pagesTimer.current) clearTimeout(pagesTimer.current)
        }
    }, [])

    return (
        <nav className="bg-myPrimary text-secondary p-4">
            <PageWrapper>
                <div className="container mx-auto  flex items-center justify-between py-2">
                    <div className="text-2xl font-bold">
                        <span className="text-mySecondary-400">Stream</span>Snap
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="bg-gray-800 rounded-full px-2 py-1">
                            <ul className="flex items-center space-x-2">
                                <li className="relative">
                                    <a href="#" className="px-4 py-2 rounded-full bg-gray-700 text-mySecondary-400 inline-block">Home</a>
                                </li>
                                <li
                                    className="relative group"
                                    onMouseEnter={() => {
                                        if (servicesTimer.current) clearTimeout(servicesTimer.current)
                                        setServicesOpen(true)
                                    }}
                                    onMouseLeave={() => {
                                        servicesTimer.current = setTimeout(() => {
                                            setServicesOpen(false)
                                        }, 200)
                                    }}
                                >
                                    <a href="#" className="px-4 py-2 inline-block hover:text-mySecondary-400">
                                        Services
                                        <ChevronDown className={`inline-block ml-1 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                                    </a>
                                    <ul
                                        className={`absolute left-0 mt-2 w-48 z-10 rounded-md shadow-lg bg-gray-700  ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-300 ease-in-out origin-top ${servicesOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                                            }`}
                                        onMouseEnter={() => {
                                            if (servicesTimer.current) clearTimeout(servicesTimer.current)
                                            setServicesOpen(true)
                                        }}
                                        onMouseLeave={() => {
                                            servicesTimer.current = setTimeout(() => {
                                                setServicesOpen(false)
                                            }, 200)
                                        }}
                                    >
                                        <li><a href="#" className="block px-4 py-2 text-sm hover:text-mySecondary-400">Web Development</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm hover:text-mySecondary-400">Mobile App Development</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm hover:text-mySecondary-400">UI/UX Design</a></li>
                                    </ul>
                                </li>
                                <li className="relative">
                                    <a href="#" className="px-4 py-2 inline-block hover:text-mySecondary-400">Projects</a>
                                </li>
                                <li
                                    className="relative group"
                                    onMouseEnter={() => {
                                        if (pagesTimer.current) clearTimeout(pagesTimer.current)
                                        setPagesOpen(true)
                                    }}
                                    onMouseLeave={() => {
                                        pagesTimer.current = setTimeout(() => {
                                            setPagesOpen(false)
                                        }, 200)
                                    }}
                                >
                                    <a href="#" className="px-4 py-2 inline-block hover:text-mySecondary-400">
                                        Pages
                                        <ChevronDown className={`inline-block ml-1 transition-transform duration-200 ${pagesOpen ? 'rotate-180' : ''}`} />
                                    </a>
                                    <ul
                                        className={`absolute left-0 mt-2 w-48 z-10 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-in-out origin-top ${pagesOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                                            }`}
                                        onMouseEnter={() => {
                                            if (pagesTimer.current) clearTimeout(pagesTimer.current)
                                            setPagesOpen(true)
                                        }}
                                        onMouseLeave={() => {
                                            pagesTimer.current = setTimeout(() => {
                                                setPagesOpen(false)
                                            }, 200)
                                        }}
                                    >
                                        <li><a href="#" className="block px-4 py-2 text-sm hover:text-mySecondary-400">About Us</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm hover:text-mySecondary-400">Team</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm hover:text-mySecondary-400">Testimonials</a></li>
                                    </ul>
                                </li>
                                <li className="relative">
                                    <a href="#" className="px-4 py-2 inline-block hover:text-mySecondary-400">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white bg-gray-700 hover:bg-white hover:text-black p-2 rounded-full transition-colors duration-300 "
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu size={24} />
                    </button>

                    {/*login Button (Desktop) */}                    
                        <a href="#" className="hidden md:inline-block px-4 py-2 border border-teal-500 rounded-full hover:bg-mySecondary-400 hover:text-black transition" >
                            Login
                        </a>
                    
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 w-4/5 py-3.5 max-w-sm bg-black transform transition-transform duration-700 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div
                        className={`h-full overflow-y-auto transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100 delay-300' : 'opacity-0'
                            }`}
                    >
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white"
                                aria-label="Close mobile menu"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <ul className="bg-gray-800 p-4 space-y-4">
                            <li><a href="#" className="block px-4 py-2 text-tirtiary">Home</a></li>
                            <li>
                                <button
                                    onClick={() => setServicesOpen(!servicesOpen)}
                                    className="flex items-center justify-between w-full px-4 py-2 text-left"
                                    aria-expanded={servicesOpen}
                                >
                                    Services
                                    <ChevronDown className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesOpen && (
                                    <ul className="mt-2 ml-4 space-y-2 bg-gray-700 rounded-lg">
                                        <li><a href="#" className="block px-4 py-2 text-sm">Web Development</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm">Mobile App Development</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm">UI/UX Design</a></li>
                                    </ul>
                                )}
                            </li>
                            <li><a href="#" className="block px-4 py-2">Projects</a></li>
                            <li>
                                <button
                                    onClick={() => setPagesOpen(!pagesOpen)}
                                    className="flex items-center justify-between w-full px-4 py-2 text-left"
                                    aria-expanded={pagesOpen}
                                >
                                    Pages
                                    <ChevronDown className={`transition-transform duration-200 ${pagesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {pagesOpen && (
                                    <ul className="mt-2 ml-4 space-y-2 bg-gray-700 rounded-lg">
                                        <li><a href="#" className="block px-4 py-2 text-sm">About Us</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm">Team</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-sm">Testimonials</a></li>
                                    </ul>
                                )}
                            </li>
                            <li><a href="#" className="block px-4 py-2">Blog</a></li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 border border-tirtiary rounded-full text-center hover:bg-tirtiary hover:text-primary transition"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-700"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    ></div>
                )}
            </PageWrapper>
        </nav>
    )
}
