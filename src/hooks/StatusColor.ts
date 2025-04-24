

export const useStatusColor = ()=>{
    const getStatusColor = (status: string) => {
        switch (status) {
          case "Pending":
            return "bg-amber-500 p-2 text-gray-100 rounded-md";  
          case "In-Progress":
            return "bg-blue-500 p-2 text-gray-100 rounded-md";  
          case "Delivered":
            return "bg-green-500 p-2 text-gray-100 rounded-md";  
            case "Cancelled":
            return "bg-red-500 p-2 text-gray-100 rounded-md";
          default:
            return "bg-gray-500 p-2 text-gray-100 rounded-md";  
        }
      };

      return {
        getStatusColor
      }
}