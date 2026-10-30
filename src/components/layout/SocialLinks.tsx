import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const socialLinks: { label: string; href: string; Icon: IconType }[] = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "Twitter", href: "https://www.twitter.com/", Icon: FaXTwitter },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: FaYoutube },
];

export function SocialLinks() {
  return (
    <ul className="social-links" aria-label="Social media">
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
