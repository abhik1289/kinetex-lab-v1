import EventCTA from "@/components/event-kbc/kbc-cta";
// import EventFAQ from "@/components/event-kbc/kab-faq";
import KbcAbout from "@/components/event-kbc/kbc-about";
import KbcFooter from "@/components/event-kbc/kbc-footer";
import KbcHeader from "@/components/event-kbc/kbc-header";
import KbcHero from "@/components/event-kbc/kbc-hero";
import React from "react";
import EventFaq from "@/components/event-kbc/kbc-faq";
import EventIntroduction from "@/components/event-kbc/kbc-intro";
import KbcJourney from "@/components/event-kbc/kbc-journey";

function page() {
  return (
    <div>
      <KbcHeader />
      <KbcHero />
      <EventIntroduction />
      <KbcJourney />
      <EventFaq />
      <KbcFooter />
    </div>
  );
}

export default page;
