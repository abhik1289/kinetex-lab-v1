"use client";

import KietexHome from "@/components/Home";
import About from "@/components/About";
import KineTechDomains from "@/components/Domain";
import Resources from "@/components/Resource";
import Founders from "@/components/Founders";
import KbcHomeBanner from "@/components/event-kbc/kbc-home-banner";
function page() {
  return (
    <div>
      <KietexHome />
      <KbcHomeBanner />
      <About />
      <KineTechDomains />
      <Resources />
      <Founders />
    </div>
  );
}

export default page;
