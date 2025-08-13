import React from "react";
import FeedBack from "../Home/FeedBack";

function About() {
  return (
    <div className="flex items-center justify-center w-full mt-12 px-4">
      <div className="flex items-start justify-center flex-col w-full lg:max-w-[1200px] rounded-lg p-4">
        {/* About TechR Section */}
        <section id="about" className="w-full">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-left">
            About TechR
          </h2>
          <p className="text-sm md:text-lg text-justify leading-7 mx-auto max-w-6xl">
            In this ever-evolving world, technology is advancing at an
            unprecedented pace. At{" "}
            <a
              href="https://www.techrbytes.com"
              className="text-sky-500 underline font-semibold"
            >
              TechR
            </a>
            , we are committed to simplifying this journey for you. Whether
            you're a tech enthusiast or someone simply looking for reliable
            <span className="p-[2px] bg-black text-orange-500 m-1 rounded-sm">
              information
            </span>
            , we offer the insights, reviews, and guidance needed to help you
            thrive in the ever-changing tech landscape. From cutting-edge
            devices to essential how-tos, TechR is your trusted companion.
          </p>
        </section>

        {/* Our Mission Section */}
        <section id="mission" className="w-full mt-8">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-left">
            Our Mission
          </h2>
          <p className="text-sm md:text-lg text-justify leading-7 mx-auto max-w-6xl">
            Our aim is simple: making technology accessible and fun for all. We
            believe in knowledge empowerment, and at TechR, we offer updated,
            accurate tech news, trends, and product reviews. Stay ahead of
            technology with better-informed decisions.
          </p>
        </section>

        {/* Our Vision Section */}
        <section id="vision" className="w-full mt-8">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-left">
            Our Vision
          </h2>
          <p className="text-sm md:text-lg text-justify leading-7 mx-auto max-w-6xl">
            We envision a world where technology integrates perfectly into
            everyday life. TechR aims to be a leading voice in the tech
            community, offering clear and comprehensive resources to guide you
            through every milestone in the tech landscape.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="w-full mt-8">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-left">
            Why Choose TechR?
          </h2>
          <ul className="list-disc text-sm md:text-lg text-justify leading-7 mx-auto max-w-6xl pl-5 md:pl-8">
            <li>
              <strong>Latest News:</strong> Get the latest tech news from us.
            </li>
            <li>
              <strong>In-depth Reviews:</strong> Make the best purchase
              decisions with our reviews.
            </li>
            <li>
              <strong>Comprehensive Guides:</strong> Easy-to-follow tutorials
              for all skill levels.
            </li>
            <li>
              <strong>Community Building:</strong> Join discussions and grow
              with the tech community.
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full mt-8">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-left">
            Get in Touch
          </h2>
          <p className="text-sm md:text-lg text-justify leading-7 mx-auto max-w-6xl">
            Got a question, feedback, or collaboration opportunity? We’d love to
            hear from you! Reach out to us at{" "}
            <a
              href="mailto:contact@techrbytes.com"
              className="text-sky-500 underline font-semibold"
            >
              techr.connect@gmail.com
            </a>
            or follow us on our social media channels. Stay connected, stay
            informed.
          </p>
        </section>
        <FeedBack />
      </div>
    </div>
  );
}

export default About;
