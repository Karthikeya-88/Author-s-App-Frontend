import { MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="button-icons-container mt-4">
        <button type="button" className="button-icons">
          <a className="anchor-el" href="https://portfolio-k4xr.vercel.app/">
            <CgProfile />
          </a>
        </button>
        <button type="button" className="button-icons">
          <a className="anchor-el" href="mailto:dkarthikeya888@gmail.com">
            <MdEmail />
          </a>
        </button>
        <button type="button" className="button-icons">
          <a
            className="anchor-el"
            href="http://www.linkedin.com/in/karthikeya-doosa-210a42244"
          >
            <BiLogoLinkedinSquare />
          </a>
        </button>
        <button type="button" className="button-icons">
          <a className="anchor-el" href="https://github.com/Karthikeya-88">
            <VscGithub />
          </a>
        </button>
      </div>
    </div>
  );
};

export default Footer;
