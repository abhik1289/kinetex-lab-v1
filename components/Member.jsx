import React from 'react';

const MemberSection = () => {
  // Sample member data
const members = [
  {
    id: 1,
    name: "Sukrit Samanta",
    department: "Web Development Co-Lead",
    quote:
      "I turn ideas into interactive experiences, writing code that's as clean as it is creative.",
    image: "/members/2.jpg",
  },
  {
    id: 2,
    name: "Rewa Shukla",
    department: "Creative Media Lead",
    quote:
      "I design stories you can see, crafting visuals that speak louder than words.",
    image: "/members/3.jpg",
  },
     {
    id: 15,
    name: "Tanay Tushar",
    department: "Creative Media Co-Lead",
    quote: "I blend creativity with strategy to turn visuals into lasting impressions.",
    image: "/members/16.jpg",
  },
  {
    id: 3,
    name: "Upayan Dutta",
    department: "Web Development Lead",
    quote:
      "I build scalable systems that turn complex challenges into seamless solutions.",
    image: "/members/1.jpg",
  },
    {
    id: 17,
    name: "Sourajit Samanta",
    department: "GD Lead",
    quote: "Design is where vision meets clarity—I make every pixel speak the brand's story.",
    image: "/members/17.jpg",
  },
  {
    id: 4,
    name: "Souparna Maji",
    department: "Operations & HR Lead",
    quote:
      "I keep teams moving in sync, making sure great ideas turn into real impact.",
    image: "/members/4.jpg",
  },
  {
    id: 7,
    name: "Soham Pramanik",
    department: "Operations & HR Co-Lead",
    quote:
      "I nurture talent, build trust, and create a culture where every member can grow and contribute.",
    image: "/members/7.jpg",
  },
    {
    id: 18,
    name: "Sukrit Srivastava",
    department: "Operations & HR Co-Lead",
    quote: "I connect people, processes, and purpose to keep everything running smoothly.",
    image: "/members/18.jpg",
  },
  {
    id: 5,
    name: "Sourish Dey",
    department: "Research & Development Lead",
    quote:
      "I explore emerging tech to turn research into breakthroughs worth building.",
    image: "/members/5.jpg",
  },
  {
    id: 6,
    name: "Shreyanshu Ranjan",
    department: "AI/ML Lead",
    quote:
      "I train machines to learn smarter and solve problems we haven't yet imagined.",
    image: "/members/6.jpg",
  },
  {
    id: 8,
    name: "Yash Raj",
    department: "AI/ML Co-Lead",
    quote: "I build intelligent systems to solve real problems.",
    image: "/members/13.jpg",
  },
  {
    id: 9,
    name: "Shubham Singh",
    department: "Marketing Lead",
    quote: "I bridge brands and audiences through compelling stories.",
    image: "/members/9.jpg",
  },
  {
    id: 10,
    name: "Ayetri Chakrabarti",
    department: "Marketing Co-Lead",
    quote: "I craft stories that connect ideas with people.",
    image: "/members/10.jpg",
  },
   {
    id: 13,
    name: "Tirth Patel",
    department: "Marketing Co-Lead",
    quote: "I turn ideas into campaigns that spark attention and build real connections.",
    image: "/members/15.jpg",
  },
  {
    id: 12,
    name: "Taiba Sayada",
    department: "Event Management Lead",
    quote: "I create experiences that people remember long after the event is over.",
    image: "/members/12.jpg",
  },
  {
    id: 11,
    name: "Sidharta Jana",
    department: "Event Management Co-Lead",
    quote: "I shape ideas into well-timed experiences where every detail tells a story.",
    image: "/members/11.jpg",
  },
    {
    id: 14,
    name: "Sohom Ch. Chandra",
    department: "IoT Lead",
    quote: "I connect the physical and digital worlds to build smarter, responsive systems.",
    image: "/members/14.jpg",
  },
  {
    id: 15,
    name: "Diyashree Sukul",
    department: "Quantum Gt lead",
    quote: "I explore the frontier of computation where curiosity meets the future of technology.",
    image: "/members/15.jpeg",
  },
];

  // Duplicate members for seamless infinite scroll
  const duplicatedMembers = [...members, ...members];

return (
  <div className="min-h-screen bg-black text-white relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
      }}></div>
    </div>

    <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-4">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4 tracking-wider uppercase">
          Meet our team
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 px-2">
          The talents are{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent animate-pulse">
            exceptional
          </span>
        </h1>
      </div>

      {/* Scrolling cards container */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        {/* Cards wrapper */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6 animate-scroll-left-mobile sm:animate-scroll-left" style={{ width: 'max-content' }}>
          {duplicatedMembers.map((member, index) => (
            <div
              key={`${member.id}-${index}`}
              className="flex-shrink-0 w-64 sm:w-72 lg:w-80 h-80 sm:h-88 lg:h-96 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between relative"
              style={{
                background: index % 3 === 0 
                  ? 'linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, rgba(160, 82, 45, 0.9) 100%)'
                  : index % 3 === 1
                  ? 'linear-gradient(135deg, rgba(30, 64, 175, 0.8) 0%, rgba(59, 130, 246, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(120, 53, 15, 0.8) 0%, rgba(180, 83, 9, 0.9) 100%)'
              }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-xl sm:rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Member image */}
                <div className="flex justify-center mb-4 sm:mb-5 lg:mb-6">
                  <div className="w-32 h-28 sm:w-36 sm:h-32 lg:w-45 lg:h-40 overflow-hidden border-2 sm:border-3 border-white/30 shadow-xl rounded-md sm:rounded-lg">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Member info */}
                <div className="flex-grow flex flex-col">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 text-center leading-tight">
                    {member.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4 text-center tracking-wide uppercase leading-tight">
                    {member.department}
                  </p>
                  
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed sm:leading-relaxed text-center flex-grow italic">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dark fade overlays - responsive width */}
        <div className="absolute left-0 top-0 w-24 sm:w-32 lg:w-48 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 sm:w-32 lg:w-48 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      </div>
    </div>

  <style jsx>{`
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      @keyframes scroll-left-mobile {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-40%);a
        }
      }
      
      .animate-scroll-left {
        animation: scroll-left 80s linear infinite;
      }
      
      .animate-scroll-left-mobile {
        animation: scroll-left-mobile 70s linear infinite;
      }

      @media (min-width: 640px) {
        .animate-scroll-left-mobile {
          animation: scroll-left 80s linear infinite;
        }
      }
    `}</style>
  </div>
);
};

export default MemberSection;