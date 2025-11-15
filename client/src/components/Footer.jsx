import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="w-full bg-[#fff] text-[#0077b6] border-t border-[#0077b6]/50 mt-10 py-6 bottom-0 left-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 text-center sm:text-left gap-4">

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 sm:gap-2 justify-center sm:justify-start">
          <img
            src="/blog-logo.gif"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full shadow-sm"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
            <Link
              to="/"
              className="text-lg sm:text-xl font-bold tracking-wide text-[#0077b6] hover:text-[#005f8b] transition"
            >
              Blogverse
            </Link>

            <span className="text-xs sm:text-sm font-normal italic text-gray-500">
              - Your daily dose of blogs, stories & insights 🌿
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Shravanikuldharan/Blogverse"
            target="_blank"
            className="transition-transform hover:scale-125"
          >
            <FaGithub className="text-2xl text-[#333]" />
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
            <SiPeerlist className="text-2xl text-[#00b894]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;