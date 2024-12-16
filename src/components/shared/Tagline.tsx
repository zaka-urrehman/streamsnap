import H2 from "./texts/H2";
import P1 from "./texts/P1";

export function Tagline() {
    return (
      <section className="w-full py-20 ">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <H2 >
              Transform Your Instagram Presence with{" "}
              <span className="text-mySecondary-400">AI-Powered Tools</span>
            </H2>
            <P1>
              Join thousands of creators and businesses who trust StreamSnap to grow their Instagram presence
            </P1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="px-8 py-3 rounded-lg bg-mySecondary-500 hover:bg-mySecondary-500/90 duration-300 hover:text-white  font-semibold transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 rounded-lg border border-gray-700 hover:border-mySecondary-400 hover:text-mySecondary-400 duration-300 font-semibold transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  