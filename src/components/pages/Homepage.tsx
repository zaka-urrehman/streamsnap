
import Contact from "../shared/Contact";
import { Features } from "../shared/Features";
import Hero from "../shared/Hero";
import { Pricing } from "../shared/Pricing";
import { Tagline } from "../shared/Tagline";

export default function Homepage() {
    return (
        <div>
            <Hero/>
            <Features/>                   
            <Tagline/>   
            <Pricing/>
            <Contact/> 
        </div>
    )
}