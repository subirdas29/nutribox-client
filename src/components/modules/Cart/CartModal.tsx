import { useEffect, useState } from "react";
import {  CartMeal, updateMealState } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckIcon, Flame } from "lucide-react";

const CartModal = ({ meal, onClose }: { meal: CartMeal; onClose: () => void }) => {

  const storedMeal = useAppSelector((state) =>
    state.cart.meals.find((item) => item._id === meal._id)
  );
  
  const [portionSize, setPortionSize] = useState(storedMeal?.portionSize || "small");
  const [customizations, setCustomizations] = useState<string[]>([]);
  const [instruction, setInstruction] = useState("");
  
  const dispatch = useAppDispatch();

  // const price = meal.price
  const portionPrices:{[key:string]:number} = { small: 0, medium: 150, large: 250 };
  const [selectedPortionTotal, setSelectedPortionTotal] = useState(portionPrices[portionSize]);
  
  const handlePortionChange = (size: string) => {
    setPortionSize(size);
    setSelectedPortionTotal(portionPrices[size]); 
  };



  const customizationOptions = [
    { label: "Extra Spicy", icon: "🌶️", desc: "Add extra chili flakes" },
    { label: "Less Oil", icon: "🛢️", desc: "Reduce oil content" },
    { label: "No Onion", icon: "🧅", desc: "Exclude onions completely" },
    { label: "Extra Sauce", icon: "🥫", desc: "Double dipping sauce" },
    { label: "Gluten Free", icon: "🌾", desc: "No gluten ingredients" },
    { label: "Extra Cheese", icon: "🧀", desc: "Add cheese topping" },
  ];

  const handleCustomization = (option: string) => {
    setCustomizations((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  useEffect(() => {
    if (storedMeal) {
      setPortionSize(storedMeal.portionSize);
    }
  }, [storedMeal]);

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Customize Your Meal</h2>
          <button onClick={onClose} className="text-red-600">
           <span className="font-bold text-xl">X</span>
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Select Portion Size</h3>
          <div className="flex gap-4 mt-2">
          <button
  onClick={() => handlePortionChange("small")}
  className={`px-4 py-2 border rounded ${
    portionSize === "small" ? "bg-green-500 text-white" : "bg-gray-200"
  }`}
>
  Small
</button>
<button
  onClick={() => handlePortionChange("medium")}
  className={`px-4 py-2 border rounded ${
    portionSize === "medium" ? "bg-green-500 text-white" : "bg-gray-200"
  }`}
>
  Medium (+150)
</button>
<button
  onClick={() => handlePortionChange("large")}
  className={`px-4 py-2 border rounded ${
    portionSize === "large" ? "bg-green-500 text-white" : "bg-gray-200"
  }`}
>
  Large (+250)
</button>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Meal Preferences</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Select your customizations (Multiple choices allowed)
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 pt-6">
            {customizationOptions?.map((option) => (
              <div 
                key={option.label}
                className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300
                  ${customizations.includes(option.label) 
                    ? "border-2 border-primary bg-primary/10 ring-2 ring-primary/20" 
                    : "border hover:border-primary/30 bg-background"}`}
                onClick={() => handleCustomization(option.label)}
              >
                <div className={`absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full 
                  ${customizations.includes(option.label) 
                    ? "bg-primary text-white" 
                    : "bg-muted/50 text-transparent"}`}>
                  <CheckIcon className="w-3 h-3" />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {option.label}
                      {customizations.includes(option.label) && (
                        <span className="text-xs text-primary animate-pulse">(Selected)</span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Special Instruction (optional)</h3>
          <textarea
            className="w-full p-2 border rounded mt-2"
            placeholder="Add any special instructions..."
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button onClick={onClose} className="bg-gray-500 px-4 py-2 rounded text-white">
            Close
          </button>
          <button
            onClick={() => {
              dispatch(updateMealState({ _id: meal._id, orderQuantity:meal.orderQuantity, basePrice:meal.basePrice, portionSize, portionTotal: selectedPortionTotal,instruction,customizations,}));
              toast.success("Meal customized successfully! Enjoy your personalized dish. 🍽️✅");
              onClose();
            }}
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Add Customization
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;