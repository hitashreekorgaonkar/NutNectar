import React from "react";
import ContactForm from "../components/ContactForm";

export default function ContactUs() {
  return (
    <div className="py-14 grid justify-items-center">
      <h1 className="text-4xl">Contact Us</h1>
      <div className="border-b-2 mt-2 border-black w-20"></div>
      <div className="grid grid-cols-1 lg:grid-cols-8 p-5">
        <div className="col-start-3 col-span-4">
          <p className="pb-3">
            Thank you for your interest in [Your Nut Butter Brand]! We're
            thrilled to assist you in any way we can. Whether you have a
            question, need assistance with an order, or simply want to share
            your thoughts, we're here to help. Please feel free to reach out to
            us through any of the following channels:
          </p>
          <p className="pb-3">
            Email us at contact@happyjars.in or call or Whatsapp{" "}
            <span className="font-bold">+91 980555088.</span>
          </p>
          <p className="pb-3">
            For corporate/bulk gifting orders, contact at{" "}
            <span className="font-bold">+91 980555088</span> or email at
            shriya@happyjars.in
          </p>
          <p className="pb-3 ">
            Social Media: Stay connected with us on social media for the latest
            updates, promotions, and delicious nut butter inspiration. Follow us
            on
            <a href="http://" target="_blank">
              <img
                width="24"
                height="24"
                className="inline ml-2"
                src="https://img.icons8.com/material-sharp/24/facebook-new.png"
                alt="facebook-new"
              />
            </a>
            <a href="http://" target="_blank">
              <img
                width="24"
                height="24"
                className="inline"
                src="https://img.icons8.com/material-sharp/24/twitter.png"
                alt="twitter"
              />
            </a>
            <a href="http://" target="_blank">
              <img
                width="24"
                height="24"
                className="inline"
                src="https://img.icons8.com/material-rounded/18/instagram-new.png"
                alt="instagram-new"
              />
            </a>
          </p>
        </div>
        <div className="col-start-3 col-span-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867617.0882294737!2d74.1220567089367!3d18.799498602616538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v1708949401887!5m2!1sen!2sin"
            height="300"
            className="w-full"
            style={{ border: 0 }}
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="col-start-1 col-span-8 lg:col-start-4 lg:col-span-3 px-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
