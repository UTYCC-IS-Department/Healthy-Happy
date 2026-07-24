"use client";
import React from "react";
import Headline from "./about_us_comp/HeadLine";
import WhereCanBuy from "./about_us_comp/WhereCanBuy";
import CoreIdentity from "./about_us_comp/CoreIdentity";
import Sustainability from "./about_us_comp/Sustainability";


export function AboutUsPage() {
  return (
    <div>
      <Headline/>

      <CoreIdentity/>
      <Sustainability/>
      <WhereCanBuy/>
    </div>
  );
}

export default AboutUsPage;