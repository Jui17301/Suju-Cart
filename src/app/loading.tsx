import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Image
        src="https://i.stack.imgur.com/hzk6C.gif"
        width={500}
        height={500}
        alt="loading"
        className="w-96"
      />
    </div>
  );
};

export default LoadingPage;
