import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";

import WhyChoose from "./WhyChoose";
import OurFeatures from "./OurFeatures";
import GetInTouch from "./GetinTouch";
import ChatBot from "./Chatbot";


function MainPage() {
  return (
    <>
    <span  id = "home">
      {/* ✅ Reusable Header */}
      <Header />

      {/* ✅ Main Content */}
      
        <HeroSection />
        <WhyChoose/>
        <OurFeatures />
        <ChatBot/>
        <GetInTouch/>
     
   
      </span>
    </>
  );
}

export default MainPage;
