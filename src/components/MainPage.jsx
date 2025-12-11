import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";



import OurFeatures from "./OurFeatures";
import GetInTouch from "./GetinTouch";
import ChatBot from "./Chatbot";
import WhyChoose from "./whyChoose";
// import WhyChoose from "./WhyChoose";

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
