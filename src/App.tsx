import { Header } from './components/Header';
import { RahulMIntro } from './components/RahulMIntro';
import { RahulMFlightEngine } from './components/RahulMFlightEngine';
import { InspectionChapter } from './components/InspectionChapter';
import { ShowcaseDock } from './components/ShowcaseDock';
import { ExperienceChapter } from './components/ExperienceChapter';
import { ResearchChapter } from './components/ResearchChapter';
import { ArchiveSection } from './components/ArchiveSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  return (
    <div id="top" className="relative min-h-screen bg-white text-[#0c0d0e]">
      {/* Header with Wordmark and Nav */}
      <Header />

      {/* The Continuous Rahul M Flight Path Engine (Airplane + Dynamic Contrail) */}
      <RahulMFlightEngine />

      <main id="main">
        {/* The 3-Beat Opening Scene */}
        <RahulMIntro />

        {/* Chapter 1: The Inspection Scene (Magnifier Object) */}
        <InspectionChapter />

        {/* Chapter 2: Selected Work with the Interactive App Dock & Coffee Object */}
        <ShowcaseDock />

        {/* Chapter 3: Experience & Operations Grid */}
        <ExperienceChapter />

        {/* Chapter 4: Published IEEE ICIDCA Research */}
        <ResearchChapter />

        {/* The Collection / Archive Accordions */}
        <ArchiveSection />

        {/* Contact and Wordmark Footer */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
