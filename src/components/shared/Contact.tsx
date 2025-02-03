
"use client"
import PageWrapper from "./wrappers/PageWrapper";
import InputField from "@/components/shared/inputs/InputField";
import TextareaField from "@/components/shared/inputs/TextAreaField";
import { useState } from "react";
import H2 from "./texts/H2";
import P1 from "./texts/P1";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <section id="contact" className="w-full py-20 ">
            <PageWrapper>
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <H2>
                                Get in Touch
                            </H2>
                            <P1>
                                Have questions about StreamSnap? Our team is here to help you succeed.
                            </P1>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-mySecondary-400 mb-2">Email</h3>
                                    <p className=" text-gray-500 dark:text-gray-300">support@streamsnap.com</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-mySecondary-400 mb-2">Office</h3>
                                    <p className="text-gray-500 dark:text-gray-300">123 Social Media Street<br />Digital City, DC 12345</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-gray-300/50 backdrop-filter backdrop-blur-lg  shadow-md dark:border-gray-800 dark:bg-gray-900/50 p-6">
                            <form className="space-y-6">
                                {/* <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mySecondary-400 text-white"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mySecondary-400 text-white"
                                        placeholder="your@email.com"
                                    />
                                </div> */}
                                {/* <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mySecondary-400 text-white"
                                        placeholder="Your message"
                                    />
                                </div> */}
                                <InputField
                                    label="Name"
                                    type="text"
                                    id="name"
                                    placeholder="Your name"
                                    required={true}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Email"
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required={true}
                                />
                                <TextareaField
                                    label="Message"
                                    id="message"
                                    rows={6}
                                    placeholder="Your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="submit"
                                    className="w-full px-8 py-3 rounded-lg bg-mySecondary-400 hover:bg-mySecondary-500/90 text-black hover:text-white font-semibold transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </section>
    )
}

