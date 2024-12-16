import { Check } from 'lucide-react'
import H2 from './texts/H2'
import P1 from './texts/P1'
import PageWrapper from './wrappers/PageWrapper'

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for personal brands",
      features: [
        "Basic automation tools",
        "Content scheduling",
        "Basic analytics",
        "1 Instagram account"
      ]
    },
    {
      name: "Professional",
      price: "$79",
      description: "Ideal for growing businesses",
      features: [
        "Advanced automation",
        "AI-powered responses",
        "Advanced analytics",
        "3 Instagram accounts",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Custom automation workflows",
        "Dedicated account manager",
        "Custom integrations",
        "Unlimited accounts",
        "24/7 premium support"
      ]
    }
  ]

  return (
    <section className="w-full py-20 ">
      <PageWrapper>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <H2>
              Simple, Transparent Pricing
            </H2>
            <P1>
              Choose the perfect plan for your needs
            </P1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-between p-6 rounded-lg border-2 border-gray-400 hover:border-mySecondary-500 duration-300 bg-gray-500 bg-opacity-20 backdrop:filter backdrop-blur-xl hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold ">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-mySecondary-400">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-800 dark:text-gray-400">/month</span>}
                  </div>
                  <p className="mt-2  dark:text-gray-400">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <Check className="w-5 h-5 mr-2 text-[#00E5FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 rounded-lg bg-mySecondary-400 hover:bg-mySecondary-400/90 hover:text-white text-black font-semibold transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </section>
  )
}

