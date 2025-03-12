"use client"

export const CookingLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Pot */}
        <div className="w-16 h-10 bg-green-600 rounded-b-lg relative z-10 border-2 border-green-700"></div>
        {/* Handles */}
        <div className="absolute w-20 h-2 bg-green-700 rounded-full -top-1"></div>
        {/* Steam Smoke */}
        <div className="absolute flex space-x-2 -top-8">
          <div className="w-4 h-4 bg-gray-300 rounded-full opacity-50 animate-smoke1"></div>
          <div className="w-5 h-5 bg-gray-400 rounded-full opacity-40 animate-smoke2"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full opacity-50 animate-smoke3"></div>
        </div>
        {/* Steam Bubbles */}
        <div className="absolute flex space-x-2 -top-5">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bubble1"></div>
          <div className="w-3 h-3 bg-green-300 rounded-full animate-bubble2"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bubble3"></div>
        </div>
        {/* Cooking Text */}
        <div className="absolute -top-16 text-green-700 text-lg font-bold animate-text">Cooking...</div>
      </div>

      <style jsx>{`
        @keyframes bubble1 {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-10px); opacity: 0.7; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        
        @keyframes bubble2 {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-12px); opacity: 0.7; }
          100% { transform: translateY(-25px); opacity: 0; }
        }
        
        @keyframes bubble3 {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-8px); opacity: 0.7; }
          100% { transform: translateY(-22px); opacity: 0; }
        }
        
        @keyframes smoke1 {
          0% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-15px); opacity: 0.3; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        
        @keyframes smoke2 {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-18px); opacity: 0.3; }
          100% { transform: translateY(-35px); opacity: 0; }
        }
        
        @keyframes smoke3 {
          0% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-12px); opacity: 0.3; }
          100% { transform: translateY(-28px); opacity: 0; }
        }
        
        @keyframes text {
          0% { opacity: 1; transform: translateY(0); }
          25% { opacity: 0.7; transform: translateY(-1px); }
          50% { opacity: 0.5; transform: translateY(-2px); }
          75% { opacity: 0.7; transform: translateY(-1px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-bubble1 {
          animation: bubble1 0.8s infinite ease-in-out;
        }
        .animate-bubble2 {
          animation: bubble2 0.9s infinite ease-in-out;
        }
        .animate-bubble3 {
          animation: bubble3 1s infinite ease-in-out;
        }
        .animate-smoke1 {
          animation: smoke1 1.5s infinite ease-in-out;
        }
        .animate-smoke2 {
          animation: smoke2 1.8s infinite ease-in-out;
        }
        .animate-smoke3 {
          animation: smoke3 2s infinite ease-in-out;
        }
        .animate-text {
          animation: text 1.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CookingLoader;