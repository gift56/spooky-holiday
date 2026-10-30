import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { motion } from "motion/react";

const socialLinks: { label: string; href: string; Icon: IconType }[] = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "Twitter", href: "https://www.twitter.com/", Icon: FaXTwitter },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: FaYoutube },
];

type SocialLinksProps = {
  isRevealed: boolean;
};

export function SocialLinks({ isRevealed }: SocialLinksProps) {
  return (
    <motion.ul
      className="social-links"
      aria-label="Social media"
      initial="hidden"
      animate={isRevealed ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: 0.9, staggerChildren: 0.1 },
        },
      }}
    >
      {socialLinks.map(({ label, href, Icon }) => (
        <motion.li
          key={label}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon aria-hidden="true" />
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
