import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

import { Block } from "../components/Common/Block";
import Logo from "../components/Common/Logo";
import { footerData, Plans, Community, FooterLink2 } from "../data/footer-links";

const Column = ({ title, children }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
    <div className="text-sm">{children}</div>
  </div>
);

const Footer = () => {
  const { token } = useSelector(state => state.auth);
  const languages = FooterLink2[1].links;
  const career = FooterLink2[2].links.filter((l) => l.title !== "-");

  return (
    <footer className={`container-x ${token ? "mt-12" : "mt-28"} pb-8`}>
      {/* CTA card */}
      {!token && <div className="relative overflow-hidden rounded-5xl border border-foreground/10 bg-surface p-8 sm:p-12 md:p-16">


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
      </div>}

      {/* Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 pt-16 pb-12">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-5">
          <Logo />
          <p className="text-sm text-foreground/45 max-w-[280px]">
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
          <ul className="flex flex-col gap-2.5 text-foreground/45">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/contact-us" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li className="cursor-pointer hover:text-foreground transition-colors">Careers</li>
            <li className="cursor-pointer hover:text-foreground transition-colors">Affiliates</li>
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

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 divider text-xs text-foreground/35">
        <div className="flex flex-wrap gap-5">
          <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
          <span className="hover:text-foreground cursor-pointer">Cookie Policy</span>
          <span className="hover:text-foreground cursor-pointer">Terms</span>
          {Community.map((c) => (
            <span key={c.name} className="hover:text-foreground cursor-pointer">{c.name}</span>
          ))}
        </div>
        <p>© {new Date().getFullYear()} ClassNotion. Made with ♥ by Aman.</p>
      </div>
    </footer>
  );
};

export default Footer;
