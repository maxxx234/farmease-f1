import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";



import OurFeatures from "./OurFeatures";
import GetInTouch from "./GetinTouch";
// import ChatBot from "./ChatBot";
import ChatWidget from "./Chatbot";
// import WhyChoose from "./whyChoose";
import WhyChoose from "./whyChoose";

function MainPage() {
  return (
    <>
    <span  id = "home">
      {/* ✅ Reusable Header */}
      <Header />

      {/* ✅ Main Content */}
      
        <HeroSection />
        {/* <WhyChoose/> */}
      <WhyChoose/>
        <OurFeatures />
        <ChatBot/>
<ChatWidget/>
        <GetInTouch/>
     
   
      </span>
    </>
  );
}

export default MainPage;
