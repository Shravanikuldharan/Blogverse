import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="w-full bg-[#F8E7F6] text-[#BE5985] border-t border-pink-200 mt-10 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 text-center sm:text-left gap-4">
        
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <img
            src="/blog-logo.png"
            alt="Blogverse Logo"
            className="w-9 h-9 object-contain"
          />
          
          <div className="flex items-center flex-wrap gap-2">
            <Link
              to="/"
              className="text-xl font-semibold tracking-wide hover:opacity-90 transition"
            >
              Blogverse
            </Link>
            <span className="text-sm text-[#b56a90]">
              - Your daily dose of blogs, stories & insights 🌿
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/shravanikuldharan"
            target="_blank"
            className="transition-transform hover:scale-125"
          >
            <FaGithub className="text-2xl text-[#171515]" />
          </a>

          <a
            href="https://www.linkedin.com/in/shravani-kuldharan"
            target="_blank"
            className="transition-transform hover:scale-125"
          >
            <FaLinkedin className="text-2xl text-[#0077b5]" />
          </a>

          <a
            href="https://peerlist.io/shravani_k"
            target="_blank"
            className="transition-transform hover:scale-125"
          >
            <SiPeerlist className="text-2xl text-[#16A34A]" />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-[#b56a90] mt-4">
        © {new Date().getFullYear()} Blogverse 
      </div>
    </footer>
  );
}

export default Footer;