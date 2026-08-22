import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../routes/RouteName";
import { fetchTutorialsApi } from "../service/networkService";

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  videoUrl: string;
  active?: boolean;
}

const DEFAULT_TUTORIALS: VideoTutorial[] = [
  {
    id: "tut-1",
    title: "Foundation Stitches: Chain & Slip Knot",
    description: "Perfect for absolute beginners starting their journey.",
    duration: "05:24",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUbjPsnnFxJ5sFKS57vEXtIZIEl8v8cVQ8zZm8QHAqPEFaTDQMeL15GYbGwZvBLalU-Ej8_TqatemD6Y3tLbG7TPOe8Q6Xycuk7HK3GNqLAJW073jC8dDLD6LVO0Pz-QG1UXJrFGOEA8A4SP_Oyqm1miNhGjtHxNxX1Kk4bLi1FUmoKr8TOEPVeER7RItux7hcfwzFQsBJk_NSKMuwVb23vDPdk5pqihK05KTog9EKplTxB6nzsb2pnw",
    videoUrl: "https://www.youtube.com/watch?v=aAxGTnrA3yE",
  },
  {
    id: "tut-2",
    title: "Mastering the Half Double Crochet",
    description: "Build texture and height with this versatile stitch.",
    duration: "12:10",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChYmDPrzp5wMQZLduCU9UM-XGwOB_Aw_ZQ7Va_LUepvKoUsZqoHx0qaMX6In3ZBAOtFI3WqIud6FhixYUmB7_QImmbEFZHZjmCNQ-ORg9m59ew0sa5iloj602e_DYJ7VQm5sNgSoWam2qqoq8n_DjVODmQQ_V9DJtzX5u8JWkj4X1Xlzsv063khldeTFO62n95b2fLAWwSoTWPvP6JLnSVVdWKhHq42QoGFVhNBgg49L0pTEApLLtlyw",
    videoUrl: "https://www.youtube.com/watch?v=eq_6f3Y2TQE",
  },
  {
    id: "tut-3",
    title: "The Alpine Stitch Blanket Pattern",
    description: "A deep dive into creating rich, raised textures.",
    duration: "45:30",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ITUreOuL4q2bQH2kgLF6B_3k1I4GebIKjg84dB7Q6_49cAUNChq6ZHdBUHjgORIoVQMICYnEZ3iPjIXq1bCYaS2tLmW3PP7S5WHsxMD203SDp00oyG_dyMSbh44ATayA93hyXEhYBu-YGw12MYaNli9TNprosKSFviu16iWa6zUlAPKM8umPDSA9i3GhD6E13gHXJo7TB1qMjO6WFjYE1wKD4hDOynI6-XUaoSrR9johjR0xsS3x2Q",
    videoUrl: "https://www.youtube.com/watch?v=7Kk31XwK0sA",
  },
];

const LearningHubScreen: React.FC = () => {
  const [tutorials, setTutorials] = useState<VideoTutorial[]>(DEFAULT_TUTORIALS);

  useEffect(() => {
    const loadTutorials = async () => {
      try {
        const dbTutorials = await fetchTutorialsApi();
        if (dbTutorials && dbTutorials.length > 0) {
          const activeList = dbTutorials.filter((t: any) => t.active !== false);
          if (activeList.length > 0) {
            activeList.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
            setTutorials(activeList);
          }
        }
      } catch (err) {
        console.error("Failed loading tutorials from Firestore:", err);
      }
    };
    loadTutorials();
  }, []);

  const handleVideoClick = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 font-body text-[#1b1c1a] space-y-16">
      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1b1c1a]">
          The Learning Hub
        </h1>
        <p className="text-base md:text-lg text-[#464840] leading-relaxed">
          Elevate your craft. Discover curated video tutorials from foundational stitches to complex, intricate patterns. Click any video to watch directly on our YouTube channel.
        </p>
      </header>

      {/* Personal Masterclass Promo Section */}
      <section className="bg-[#efeeea] rounded-3xl overflow-hidden shadow-lg border border-[#e4e2de]">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block px-3.5 py-1 bg-[#585e4c]/10 text-[#585e4c] font-bold text-xs uppercase tracking-widest rounded-full mb-3">
                1-on-1 Guidance
              </span>
              <h2 className="font-display text-3xl font-semibold text-[#1b1c1a] mb-2">
                Personal Masterclass
              </h2>
              <p className="text-sm text-[#464840] leading-relaxed">
                Book a live, 30-minute private session with our master artisan to resolve your queries step-by-step and refine your technique.
              </p>
              <p className="text-xs text-[#76786f] italic mt-3">
                Starting from $1 / 280 RS per session.
              </p>
            </div>

            <div>
              <Link
                to={RouteName.MASTERCLASS}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#585e4c] hover:bg-[#717763] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Book a Private Session
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
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#1b1c1a]">
              Video Tutorials
            </h3>
            <p className="text-xs text-[#76786f] mt-1">
              Click any video tutorial to watch on YouTube
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tut) => (
            <article
              key={tut.id}
              onClick={() => handleVideoClick(tut.videoUrl)}
              className="group cursor-pointer flex flex-col space-y-4 bg-white p-4 rounded-3xl border border-[#e4e2de] hover:border-[#8e4d31] hover:shadow-xl transition-all"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video bg-[#efeeea] shadow-sm">
                <img
                  src={tut.imageUrl}
                  alt={tut.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-red-600 transition-all">
                    <span className="material-symbols-outlined text-3xl ml-0.5">
                      play_arrow
                    </span>
                  </div>
                </div>

                {/* YouTube Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-xs flex items-center gap-1">
                    ▶ YouTube
                  </span>
                </div>

                {/* Duration Badge */}
                {tut.duration && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 bg-black/80 text-white text-[10px] font-semibold rounded backdrop-blur-xs">
                      {tut.duration}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 px-1">
                <h4 className="font-display text-lg font-semibold text-[#1b1c1a] group-hover:text-[#8e4d31] transition-colors leading-snug">
                  {tut.title}
                </h4>
                <p className="text-xs text-[#464840] line-clamp-2 leading-relaxed">
                  {tut.description}
                </p>
                <div className="pt-2 text-xs font-bold text-[#8e4d31] flex items-center gap-1 group-hover:underline">
                  <span>Watch Tutorial on YouTube</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningHubScreen;
