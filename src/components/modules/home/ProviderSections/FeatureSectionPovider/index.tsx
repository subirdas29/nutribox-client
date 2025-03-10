import { Settings, PieChart, Truck, Users } from 'lucide-react';

const FeaturesSectionProvider = () => {
  const features = [
    {
      icon: <Settings className="w-8 h-8 text-green-600" />,
      title: "Easy Menu Management",
      description: "Update your menu in real-time and manage availability effortlessly.",
    },
    {
      icon: <PieChart className="w-8 h-8 text-green-600" />,
      title: "Real-Time Analytics",
      description: "Track sales, orders, and customer preferences with detailed insights.",
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: "Delivery Tracking",
      description: "Ensure timely deliveries with real-time tracking and notifications.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Customer Engagement",
      description: "Build loyalty with personalized offers and feedback collection.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
  Empower Your Meal Business
</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSectionProvider;