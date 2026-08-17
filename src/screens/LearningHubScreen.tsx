import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  isPremium: boolean;
  category: "basics" | "premium";
  image: string;
  videoUrl: string;
}

const tutorials: VideoTutorial[] = [
  {
    id: "tut-1",
    title: "Foundation Stitches: Chain & Slip Knot",
    description: "Perfect for absolute beginners starting their journey.",
    duration: "05:24",
    isPremium: false,
    category: "basics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUbjPsnnFxJ5sFKS57vEXtIZIEl8v8cVQ8zZm8QHAqPEFaTDQMeL15GYbGwZvBLalU-Ej8_TqatemD6Y3tLbG7TPOe8Q6Xycuk7HK3GNqLAJW073jC8dDLD6LVO0Pz-QG1UXJrFGOEA8A4SP_Oyqm1miNhGjtHxNxX1Kk4bLi1FUmoKr8TOEPVeER7RItux7hcfwzFQsBJk_NSKMuwVb23vDPdk5pqihK05KTog9EKplTxB6nzsb2pnw",
    videoUrl: "https://www.youtube.com/embed/aAxGTnrA3yE",
  },
  {
    id: "tut-2",
    title: "Mastering the Half Double Crochet",
    description: "Build texture and height with this versatile stitch.",
    duration: "12:10",
    isPremium: false,
    category: "basics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChYmDPrzp5wMQZLduCU9UM-XGwOB_Aw_ZQ7Va_LUepvKoUsZqoHx0qaMX6In3ZBAOtFI3WqIud6FhixYUmB7_QImmbEFZHZjmCNQ-ORg9m59ew0sa5iloj602e_DYJ7VQm5sNgSoWam2qqoq8n_DjVODmQQ_V9DJtzX5u8JWkj4X1Xlzsv063khldeTFO62n95b2fLAWwSoTWPvP6JLnSVVdWKhHq42QoGFVhNBgg49L0pTEApLLtlyw",
    videoUrl: "https://www.youtube.com/embed/eq_6f3Y2TQE",
  },
  {
    id: "tut-3",
    title: "The Alpine Stitch Blanket Pattern",
    description: "A deep dive into creating rich, raised textures.",
    duration: "45:30",
    isPremium: true,
    category: "premium",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ITUreOuL4q2bQH2kgLF6B_3k1I4GebIKjg84dB7Q6_49cAUNChq6ZHdBUHjgORIoVQMICYnEZ3iPjIXq1bCYaS2tLmW3PP7S5WHsxMD203SDp00oyG_dyMSbh44ATayA93hyXEhYBu-YGw12MYaNli9TNprosKSFviu16iWa6zUlAPKM8umPDSA9i3GhD6E13gHXJo7TB1qMjO6WFjYE1wKD4hDOynI6-XUaoSrR9johjR0xsS3x2Q",
    videoUrl: "https://www.youtube.com/embed/7Kk31XwK0sA",
  },
];

const LearningHubScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "basics" | "premium">("all");
  const [activeVideo, setActiveVideo] = useState<VideoTutorial | null>(null);

  const filteredTutorials = tutorials.filter((item) => {
    if (activeTab === "basics") return !item.isPremium;
    if (activeTab === "premium") return item.isPremium;
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a] space-y-16">
      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a]">
          The Learning Hub
        </h1>
        <p className="text-base md:text-lg text-[#464840] leading-relaxed">
          Elevate your craft. Discover curated tutorials ranging from foundational stitches to complex, intricate patterns. Learn at your own pace, or book a personalized session with our master artisans.
        </p>
      </header>

      {/* Personal Masterclass Promo Section */}
      <section className="bg-[#efeeea] rounded-3xl overflow-hidden shadow-lg border border-[#e4e2de]">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block px-3.5 py-1 bg-[#585e4c]/10 text-[#585e4c] font-bold text-xs uppercase tracking-widest rounded-full mb-3">
                Premium Experience
              </span>
              <h2 className="font-display text-3xl font-semibold text-[#1b1c1a] mb-2">
                Personal Masterclass
              </h2>
              <p className="text-sm text-[#464840] leading-relaxed">
                Book a live, one-on-one session with our lead artisan to master a specific pattern or refine your technique.
              </p>
              <p className="text-xs text-[#76786f] italic mt-3">
                Note: Pricing varies by pattern complexity.
              </p>
            </div>

            <div>
              <Link
                to={RouteName.MASTERCLASS}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Book a Live Session
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 relative min-h-[340px] bg-[#dfdad3]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYfwgukk1DcpNJ2UMUSE_NsakOw0nF-8Z4BagIA7mJkgcFGLcPMoOQNY6YUlkPRcNWQXKb05JiCQ_VkpjhidInWOSn1WICA_gbqlTWmCb_H2pJwWWr27xWGuIVgG5ogn5nTI3u3MpHCNEbKvzkkIqiaJsN8T48sX9Jn28q4VPEK-5jwTnBNtPZjXJLa3NA05wZigc3WiaUf6xZ-SXeKP9-2m9JeBQDF76ZK3BnFum_oA8drX-PcPhdtw"
              alt="Crochet Masterclass"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-end border-b border-[#e4e2de] pb-4">
          <h3 className="font-display text-2xl font-semibold text-[#1b1c1a]">
            Video Tutorials
          </h3>

          <div className="flex gap-6 mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-1 transition-colors ${
                activeTab === "all"
                  ? "text-[#8e4d31] border-b-2 border-[#8e4d31]"
                  : "text-[#76786f] hover:text-[#1b1c1a]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("basics")}
              className={`pb-1 transition-colors ${
                activeTab === "basics"
                  ? "text-[#8e4d31] border-b-2 border-[#8e4d31]"
                  : "text-[#76786f] hover:text-[#1b1c1a]"
              }`}
            >
              Free Basics
            </button>
            <button
              onClick={() => setActiveTab("premium")}
              className={`pb-1 flex items-center gap-1 transition-colors ${
                activeTab === "premium"
                  ? "text-[#8e4d31] border-b-2 border-[#8e4d31]"
                  : "text-[#76786f] hover:text-[#1b1c1a]"
              }`}
            >
              <span>Premium Patterns</span>
              <span className="material-symbols-outlined text-sm">lock</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tut) => (
            <article
              key={tut.id}
              onClick={() => setActiveVideo(tut)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video bg-[#efeeea] shadow-sm">
                <img
                  src={tut.image}
                  alt={tut.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                <div className="absolute top-4 left-4">
                  {tut.isPremium ? (
                    <span className="px-3 py-1 bg-[#dec29f] text-[#271903] text-[11px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-xs">lock</span>
                      Premium
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-white/90 text-[#585e4c] text-[11px] font-bold uppercase tracking-wider rounded-xl backdrop-blur-sm shadow-sm">
                      Free
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#8e4d31] text-2xl ml-0.5">
                      play_arrow
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4">
                  <span className="px-2 py-1 bg-black/70 text-white text-[10px] font-semibold rounded backdrop-blur-sm">
                    {tut.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-lg font-medium text-[#1b1c1a] group-hover:text-[#8e4d31] transition-colors">
                  {tut.title}
                </h4>
                <p className="text-sm text-[#464840]">{tut.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1b1c1a] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl space-y-4 p-6 relative text-white">
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <h3 className="font-display text-xl font-semibold">{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-white/80 hover:text-white"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-white/70">{activeVideo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningHubScreen;
