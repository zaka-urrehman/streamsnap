
import Contact from "../shared/Contact";
import { Features } from "../shared/Features";
import Hero from "../shared/Hero";
import Navbar from "../shared/Navbar";
import { Pricing } from "../shared/Pricing";
import { Tagline } from "../shared/Tagline";

export default function Homepage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Features />
            <Tagline />
            <Pricing />
            <Contact />
        </div>
    )
}