"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader1";

type UseInViewTuple = [React.RefObject<HTMLDivElement | null>, boolean];

const useInView = (threshold = 0.1): UseInViewTuple => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold]);

  return [ref, isInView];
};

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const [ref, isInView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function AboutUsSections() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-slate-800">
            {/* Section 1 - Original Layout */}
            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="mt-15 flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg.jpeg"
                                    alt="KIIT img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                About{" "}
                                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    KIIT
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Kalinga Institute of Industrial Technology (KIIT),
                                    Bhubaneswar, is among India's leading private universities,
                                    renowned for academic excellence, research, and innovation.
                                    Established in 1992 and granted university status in 2004, it
                                    offers programs in engineering, management, law, medicine, and
                                    more.
                                </p>
                                <p className="text-lg">
                                    With a modern green campus, top-tier infrastructure, and
                                    students from over 50 countries, KIIT fosters holistic growth
                                    through academics, culture, sports, and entrepreneurship.
                                    Recognized as an Institution of Eminence and ranked among
                                    India's best by NIRF, KIIT shapes globally competent
                                    professionals and responsible citizens.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            {/* Section 2 - Reversed Layout */}
            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    {/* Right side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg3.jpg"
                                    alt="KISS img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Left side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                About{" "}
                                <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    KISS
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Kalinga Institute of Social Sciences (KISS), Bhubaneswar, is
                                    the world’s largest fully free residential school and
                                    university for Indigenous children. Founded in 1992, it
                                    provides education, food, healthcare, and vocational training
                                    from kindergarten to higher education.
                                </p>
                                <p className="text-lg">
                                    Recognized by the UN and other global bodies, KISS empowers
                                    over 30,000 students on campus and thousands more through
                                    outreach programs. By combining quality education with
                                    cultural preservation, it transforms marginalized communities
                                    and nurtures future leaders.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            {/* Section 3 - Original Layout */}
            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-orange-600 via-orange-700 to-red-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg4.jpg"
                                    alt="Founder img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Founder Sir
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Prof. Achyuta Samanta is the visionary founder of both KIIT
                                    and KISS, institutions dedicated to education, empowerment,
                                    and social transformation. Coming from humble beginnings, he
                                    has devoted his life to providing quality education to all,
                                    especially to children from marginalized communities.
                                </p>
                                <p className="text-lg">
                                    Under his leadership, KIIT has grown into a world-class
                                    university, while KISS has become the world’s largest
                                    residential institute for Indigenous students. His work has
                                    earned global recognition, proving that education can be the
                                    greatest tool for building an equitable society.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    {/* Right side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg8.jpg"
                                    alt="Vice Chancellor img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Left side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Vice Chancellor
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Prof. (Dr.) Saranjit Singh completed his Ph.D. (Production
                                    Engg) from BIT Mesra, Ranchi, M.Tech. (Production Engg) from
                                    IIT Varanasi (Formerly IT BHU) and B.E. (Mechanical Engg) from
                                    Savitribai Phule Pune University.
                                </p>
                                <p className="text-lg">
                                    He had guided 5 Ph.D scholars and 25 Master's Dissertation and
                                    had published / presented more than 100 research articles in
                                    the international & national journals, conferences and
                                    seminars. He has published 3 books in the area of material
                                    processing technologies and is also Fellow of Institution of
                                    Engineers (India). He served as Director (Industry
                                    Engagements) and Dean (Training & Placements) since 2011 at
                                    KIIT.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-orange-600 via-orange-700 to-red-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg7.jpg"
                                    alt="Ragistrar img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Registrar Sir
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Dr. Jnyana Ranjan Mohanty received his Ph.D. degree in
                                    Computer Science from Utkal University, Bhubaneswar in the
                                    year 2008. He has more than 28 years of teaching experience
                                    (UG & PG levels). He joined KIIT Deemed to be University,
                                    Bhubaneswar in July 1997 and has served KIIT in different
                                    administrative capacities.
                                </p>
                                <p className="text-lg">
                                    He has authored books and has to his credit innumerable
                                    publications in reputed International Scopus/ SCI indexed
                                    journals and in International Conference proceedings. He has
                                    also edited books published by Springer and IJCA Volumes.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            {/* Section added - Reversed Layout */}
            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    {/* Right side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg6.jpg"
                                    alt="Director img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>
                    {/* Left side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Director General
                                </span>
                                <span> School of Computer Engineering</span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Dr. Biswajit Sahoo provides academic and administrative
                                    leadership, shaping the school’s strategic direction and
                                    fostering a robust research environment KIIT School of
                                    Computer Engineering.
                                </p>
                                <p className="text-lg">
                                    As Director-General of the School of Computer Engineering, His
                                    responsibilities also include chairing the Board of Studies,
                                    guiding curriculum development and ensuring academic standards
                                    across the school KIIT School of Computer Engineering KIIT
                                    Deemed to be University.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-orange-600 via-orange-700 to-red-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/f1.jpg"
                                    alt="Chairperson img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Chairperson
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Dr. Anjan Bandyopadhyay is an Assistant Professor at KIIT
                                    University, Bhubaneswar, with a Ph.D. from NIT Durgapur under
                                    the prestigious Vishveshwarya Fellowship of MHRD.
                                </p>
                                <p className="text-lg">
                                    His current research interest include Game Theory, Cloud
                                    Computing, Metaverse, Virtual Reality, Augmented Reality, Fog
                                    Computing, Healthcare, IoT and Machine Learning.He bags number
                                    of Best Paper Award from many conferences like 3PGCIC. He is
                                    doing many collaborative work with many foreign Universities.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    {/* Right side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/f2.jpg"
                                    alt="coperson img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Left side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Co-Chairperson Faculty Coordinator
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Mahendra Kumar Gourisaria is presently working as an Assistant
                                    Professor in the School of Computer Engineering at KIIT
                                    University, Bhubaneswar, Odisha. He has received his Master
                                    degree in Computer Application from Indira Gandhi National
                                    Open University, New Delhi and M.Tech in Computer Science and
                                    Engineering from Biju Patnaik University of Technology -
                                    Rourkela.
                                </p>
                                <p className="text-lg">
                                    He has published more than 20 research papers in different
                                    international journals and conferences of repute. He has also
                                    served as the organizing committees members of various
                                    conferences and workshop.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-orange-600 via-orange-700 to-red-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/f8.jpg"
                                    alt="Faculty Coordinator img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Faculty Coordinator
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Prof. Anil Kumar Swain a faculty member at the School of
                                    Computer Engineering, KIIT Deemed to be University,
                                    Bhubaneswar. He has authored several notable works and
                                    scholarly contributions.
                                </p>
                                <p className="text-lg">
                                    His recent research focuses heavily on applications of deep
                                    learning in medical imaging, particularly in classification
                                    and detection of lung cancer using neural networks and PET/CT
                                    imaging KIIT CSE.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    {/* Right side - Image */}
                    <AnimatedSection delay={200} className="lg:w-1/2">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/Sujata-Swain.jpg"
                                    alt="coperson img"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Left side - Content */}
                    <AnimatedSection delay={400} className="lg:w-1/2">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-white leading-tight">
                                Our Honorable{" "}
                                <span className="bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Faculty Coordinator
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p className="text-lg">
                                    Dr. Sujata Swain has 1 year of teaching experience. She holds
                                    a Ph.D. (CSE) and M.Tech (CSE) degree from IIT Roorkee. She
                                    has taught Programming in C, Computer Organization and
                                    Organization and High Performance Computer Architecture.
                                </p>
                                <p className="text-lg">
                                    Her research interests are modelling and verification tools, web
                                    service composition and pervasive computing.
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>

            {/* Section 4 - Centered Layout for School of Computer Engineering */}
            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col items-center text-center gap-12">
                    {/* Title */}
                    <AnimatedSection delay={200}>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            About{" "}
                            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                KIIT School of Computer Engineering
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg mx-auto mt-4"></div>
                    </AnimatedSection>

                    {/* Image */}
                    <AnimatedSection delay={400} className="w-full max-w-2xl">
                        <div className="relative group">
                            <div className="w-full h-96 bg-linear-to-br from-cyan-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 border border-gray-700">
                                <img
                                    src="/images/bg5.jpg"
                                    alt="KIIT School of Computer Engineering"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Text Description */}
                    <AnimatedSection delay={600} className="w-full max-w-4xl">
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <p className="text-lg">
                                The School of Computer Engineering at KIIT University stands as
                                a beacon of technological innovation and academic excellence.
                                Established with the vision of creating world-class computer
                                engineers, the school offers cutting-edge programs in computer
                                science, information technology, and emerging technologies.
                            </p>
                            <p className="text-lg">
                                With state-of-the-art laboratories, experienced faculty, and
                                industry partnerships, the school provides students with
                                hands-on experience in areas like artificial intelligence,
                                machine learning, cybersecurity, and software development. Our
                                graduates are well-equipped to tackle the challenges of the
                                digital age and contribute to technological advancement
                                globally.
                            </p>
                            <p className="text-lg">
                                The school emphasizes research, innovation, and practical
                                learning, ensuring students develop both technical expertise and
                                problem-solving skills. Through internships, industry
                                collaborations, and entrepreneurship programs, we prepare future
                                leaders in the field of computer engineering.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>
            {/* Section 5 - Centered Layout for About Us Section */}
            <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col items-center text-center gap-12">
                    {/* Title */}
                    <AnimatedSection delay={200}>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            About{" "}
                            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Us
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg mx-auto mt-4"></div>
                    </AnimatedSection>
                    {/* Text Description */}
                    <AnimatedSection delay={600} className="w-full max-w-4xl">
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <p className="text-lg">
                                <span className="text-cyan-500">KINETEX LAB</span> is a
                                student-driven community at KIIT University dedicated to
                                advancing the frontiers of quantum computing. Formed with the
                                vision of nurturing talent in emerging technologies, we aim to
                                make quantum computing accessible and impactful for students and
                                researchers.
                            </p>
                            <p className="text-lg">
                                Through workshops, research initiatives, and collaborations with
                                industry experts, we provide hands-on exposure to quantum
                                algorithms, quantum hardware, and real-world applications. Our
                                members engage with cutting-edge tools like Qiskit and Cirq,
                                preparing themselves for the rapidly evolving quantum era.
                            </p>
                            <p className="text-lg">
                                At Kinetex, we foster a culture of curiosity, innovation, and
                                teamwork. By combining academic rigor with practical
                                problem-solving, we empower students to contribute to
                                breakthroughs in quantum technology and lead the next wave of
                                computational transformation.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </AnimatedSection>
        </div>
    );
}
