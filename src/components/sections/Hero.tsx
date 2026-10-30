import pumpkinImage from "../../assets/giant-pumpkin.png";
import { SocialLinks } from "../layout/SocialLinks";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__eyebrow">
          Don’t miss the scariest holiday of the year
        </p>
        <h1 className="hero__title" id="hero-title">
          <span>Halloween</span>
          <span>Night Party</span>
        </h1>
        <p className="hero__description">
          The tradition originated with the ancient Celtic festival of Samhain,
          when people would light bonfires and wear costumes to ward off ghosts.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#contact">
            Get a ticket
          </a>
          <a className="button button--secondary" href="#rules">
            Rules
          </a>
        </div>
        <div className="hero__footer">
          <SocialLinks />
          <p className="hero__date">
            <span className="hero__date-dot" aria-hidden="true" />
            October 31
          </p>
        </div>
      </div>

      <div className="hero__art" aria-hidden="true">
        <div className="hero__glow" />
        <img
          className="hero__pumpkin"
          src={pumpkinImage}
          alt=""
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
