import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

import { Block } from "../components/Common/Block";
import Logo from "../components/Common/Logo";
import { footerData, Plans, Community, FooterLink2 } from "../data/footer-links";

const Column = ({ title, children }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
    <div className="text-sm">{children}</div>
  </div>
);

const Footer = () => {
  const languages = FooterLink2[1].links;
  const career = FooterLink2[2].links.filter((l) => l.title !== "-");

  return (
    <footer className="container-x mt-28 pb-8">
      {/* CTA card */}
      <div className="relative overflow-hidden rounded-5xl border border-white/10 bg-surface p-8 sm:p-12 md:p-16">
        <div className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-magenta/40 blur-[110px]" />
        <div className="absolute -bottom-40 left-10 w-[380px] h-[380px] rounded-full bg-violet/30 blur-[120px]" />
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <p className="eyebrow mb-4">Start today</p>
            <h2 className="h-display text-4xl sm:text-5xl md:text-6xl max-w-2xl">
              Turn curiosity into <span className="text-gradient">real skills.</span>
            </h2>
          </div>
          <Link to="/signup" className="btn btn-lg btn-primary w-fit">
            Create free account <FiArrowUpRight />
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 pt-16 pb-12">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-5">
          <Logo />
          <p className="text-sm text-white/45 max-w-[280px]">
            Hands-on courses, guided by people who build for a living. Learn at your own pace, anywhere.
          </p>
          <div className="flex gap-2">
            {[FaYoutube, FaFacebookF, FaXTwitter, FaLinkedinIn].map((Icon, i) => (
              <a key={i} href="#" className="btn-icon w-10 h-10" aria-label="Social link">
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        <Column title="Company">
          <ul className="flex flex-col gap-2.5 text-white/45">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact</Link></li>
            <li className="cursor-pointer hover:text-white transition-colors">Careers</li>
            <li className="cursor-pointer hover:text-white transition-colors">Affiliates</li>
          </ul>
        </Column>
        <Column title="Resources">
          <Block resource={footerData.slice(0, 6)} />
        </Column>
        <Column title="Languages">
          <Block resource={languages.slice(0, 6)} />
        </Column>
        <Column title="Plans & Career">
          <Block resource={[...Plans, ...career.slice(0, 3)]} />
        </Column>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 divider text-xs text-white/35">
        <div className="flex flex-wrap gap-5">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Cookie Policy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          {Community.map((c) => (
            <span key={c.name} className="hover:text-white cursor-pointer">{c.name}</span>
          ))}
        </div>
        <p>© {new Date().getFullYear()} ClassNotion. Made with ♥ by Aman.</p>
      </div>
    </footer>
  );
};

export default Footer;
