import { CheckCircle2 } from 'lucide-react'
import PageWrapper from './wrappers/PageWrapper'
import H2 from './texts/H2'
import P1 from './texts/P1'

export function Features() {
    const features = [
        {
            title: "Smart Automation",
            description: "Automate responses and engagement with AI-powered tools that understand your audience",
            icon: "/placeholder.svg?height=48&width=48"
        },
        // {
        //     title: "Content Strategy",
        //     description: "Optimize your content strategy with data-driven insights and recommendations",
        //     icon: "/placeholder.svg?height=48&width=48"
        // },
        // {
        //     title: "Analytics Dashboard",
        //     description: "Track your growth and engagement with comprehensive analytics and reporting",
        //     icon: "/placeholder.svg?height=48&width=48"
        // },
        {
            title: "AI on your behalf",
            description: "let AI engage with your audience on your behalf",
            icon: "/placeholder.svg?height=48&width=48"

        },
        {
            title: "Engagement Tools",
            description: "Build meaningful connections with your audience using our intelligent engagement tools",
            icon: "/placeholder.svg?height=48&width=48"
        }
    ]

    return (
        <section className="w-full py-20 ">
            <PageWrapper>
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-12">
                        {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                            Powerful Features
                        </h2> */}
                        {/* <p className="mt-4 text-xl text-gray-400">
                            Everything you need to grow your Instagram presence
                        </p> */}
                        <H2>
                            Powerful Features
                        </H2>
                        <P1>
                            Everything you need to grow your Instagram presence
                        </P1>
                    </div>
                    <div className=" flex justify-center items-center gap-8 flex-wrap">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className=" relative max-w-72 h-56 group p-6 rounded-lg border border-gray-800 bg-gray-400/30 dark:bg-gray-900/50 hover:bg-gray-400/50 dark:hover:bg-gray-900/75 transition-all"
                            >
                                <div className="mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-mySecondary-400" />
                                </div>
                                <h3 className="text-xl font-bold  mb-2">{feature.title}</h3>
                                <p className=" text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </PageWrapper>
        </section>
    )
}

