import Team from "@/components/ui/Team";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-700 dark:text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-400 dark:to-teal-500 mb-4">
            About SuJu Cart
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-yellow-600 dark:text-yellow-600">
            Welcome to SuJu Cart, your premier destination for premium furniture
            that combines style, sustainability, and functionality to elevate
            your living spaces.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-600 mb-6">
            Our Vision
          </h2>
          <p className="text-lg leading-relaxed text-yellow-600 dark:text-yellow-600">
            At SuJu Cart, we envision a world where every home is beautifully
            furnished with high-quality, eco-friendly pieces. Our goal is to
            create a vibrant community of design enthusiasts who appreciate
            craftsmanship and innovation in furniture design.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-600 mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-yellow-600 dark:text-yellow-600">
            Our mission is to inspire and assist our customers in creating their
            dream spaces by providing a wide selection of stylish and
            sustainable furniture. We are committed to delivering exceptional
            service and quality products that help transform houses into homes.
          </p>
        </div>

        {/* Why Us Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-600 mb-6">
            Why Choose SuJu Cart?
          </h2>
          <ul className="list-disc list-inside text-lg leading-relaxed space-y-4">
            <li className="text-yellow-600 dark:text-yellow-600">
              A curated collection of modern and classic furniture pieces for
              every room.
            </li>
            <li className="text-yellow-600 dark:text-yellow-600">
              Sustainable materials and eco-friendly practices throughout our
              supply chain.
            </li>
            <li className="text-yellow-600 dark:text-yellow-600">
              Personalized shopping experience with expert advice on furniture
              selection.
            </li>
            <li className="text-yellow-600 dark:text-yellow-600">
              Engaging community of home decor enthusiasts sharing tips and
              inspiration.
            </li>
            <li className="text-yellow-600 dark:text-yellow-600">
              Exclusive access to limited-edition furniture pieces and seasonal
              sales.
            </li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-600 mb-6">
            Meet the SuJu Team
          </h2>
          <Team />
        </div>
      </div>
    </div>
  );
};

export default About;
