"use client";
import React from "react";
import Headline from "./about_us_comp/HeadLine";
import WhereCanBuy from "./about_us_comp/WhereCanBuy";
import CoreIdentity from "./about_us_comp/CoreIdentity";

export function AboutUsPage() {
  return (
    <div>
      <Headline/>
      <CoreIdentity/>
      <WhereCanBuy/>
    </div>
  );
}

export default AboutUsPage;