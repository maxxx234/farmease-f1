


import React, { useState } from "react";
import { Leaf, BookOpen, UserCheck, CloudSun } from "lucide-react";
import WeatherPrediction from "./WeatherPrediction";
// import FarmingSchemes from "./FarmingSchemes";

import FarmingSchemes from "./FarmingSchemes";
import LeafDetector from "./LeafDetector";
export default function OurFeatures() {
  const [showWeather, setShowWeather] = useState(false);
  const [showSchemes, setShowSchemes] = useState(false);
const [showLeafDetector, setShowLeafDetector] = useState(false);

  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Weather Prediction",
      desc: "Get real time weather updates and irrigation advice",
      action: () => setShowWeather(true),
    },
   {
  icon: <BookOpen className="w-10 h-10 text-green-600" />,
  title: "AI Crop Diagnosis",
  desc: "Upload crop photos and detect disease instantly",
  action: () => setShowLeafDetector(true),
},

    {
      icon: <UserCheck className="w-10 h-10 text-green-600" />,
      title: "Soil Identification",
      desc: "Provide a thorough diagnosis of your farm soil",
      action: () => alert("Soil Identification feature coming soon!"),
    },
    {
      icon: <CloudSun className="w-10 h-10 text-green-600" />,
      title: "Farming Schemes",
      desc: "Receive latest updates regarding farming schemes",
      action: () => setShowSchemes(true),
    },
  ];

  return (
    <section id="our-features" className="w-full mt-6 py-12 px-6 md:px-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Features
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Discover the powerful tools and services we offer to boost your farm.
        </p>
      </div>

      {/* Feature Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="mb-3">{feature.icon}</div>

            {/* Title */}
            <h3 className="font-bold text-black text-base sm:text-lg">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {feature.desc}
            </p>

            {/* Open Button */}
            <span
              onClick={feature.action}
              className="text-green-600 font-semibold mt-2 cursor-pointer hover:underline text-sm sm:text-base"
            >
              Open →
            </span>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showWeather && (
        <WeatherPrediction onClose={() => setShowWeather(false)} />
      )}

      {showLeafDetector && (
  <LeafDetector onClose={() => setShowLeafDetector(false)} />
)}

      {showSchemes && (
        <FarmingSchemes onClose={() => setShowSchemes(false)} />
      )}
    </section>
  );
}

