import { Calendar, Leaf, Recycle, Trophy } from "lucide-react"

export default function BenefitsGrid() {
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "10+ Dietary Plans",
      desc: "From paleo to plant-based, we've got you covered",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Pause or Skip Anytime",
      desc: "No rigid contracts - you're in control",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Chef-Approved Recipes",
      desc: "Crafted by nutritionists and top chefs",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      gradient: "from-amber-50 to-amber-100"
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Zero-Waste Packaging",
      desc: "Eco-friendly boxes, 100% recyclable",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      gradient: "from-emerald-50 to-emerald-100"
    }
  ]

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden ">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10 ">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className=" px-4 mx-4 md:mx-12 lg:mx-20">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">
         
            Why Choose Us?
         
          
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <article 
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
                        transition-all duration-300 group overflow-hidden
                        hover:-translate-y-2 animate-card-entrance"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${benefit.gradient} 
                              opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

              {/* Icon container */}
              <div className={`${benefit.bgColor} w-fit p-3 rounded-full mb-4 
                              transition-transform duration-300 group-hover:rotate-12`}>
                <span className={`${benefit.iconColor}`}>
                  {benefit.icon}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 
                            bg-clip-text text-transparent">
                {benefit.title}
              </h3>
              <p className="text-slate-600 relative z-10">{benefit.desc}</p>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent 
                            group-hover:border-green-200/50 transition-all duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}