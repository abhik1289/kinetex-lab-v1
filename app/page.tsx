"use client"


import KietexHome from "@/components/Home"
import About from "@/components/About";
import KineTechDomains from "@/components/Domain";
import Resources from "@/components/Resource";
import Founders from "@/components/Founders";
function page() {
  return <div>
    <KietexHome/>
    <About/>
    <KineTechDomains/>
    <Resources/>
    <Founders/>
  </div>;
}

export default page;
