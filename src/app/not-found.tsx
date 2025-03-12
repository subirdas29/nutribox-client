import Image from "next/image";
import notfound from '../assets/notfound/not-found.png'

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={notfound}
       width={600}
       height={600}
        alt="not found page"
        // className="w-full h-full "
      />
    </div>
  );
};

export default NotFoundPage;
