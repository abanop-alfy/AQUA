import React, { useEffect } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailIcon from "@material-ui/icons/Mail";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Hidden from "@material-ui/core/Hidden";
import HomeIcon from '@material-ui/icons/Home';

export default function ContactUs() {
  useEffect(() => {
    const header = document.getElementById("stickyHeader") as HTMLElement;
    const sticky = header.offsetTop + header.clientHeight;
    const scrollCallBack = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", scrollCallBack);
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <div>
      <section className="et-hero-tabs">
        <h1>Contact Us</h1>
        <h3>We have an online support team</h3>
        <div className="et-hero-tabs-container" id="stickyHeader">
        <Hidden mdUp>

        <a className="et-hero-tab" href="/">
        <HomeIcon/> 
          </a>
          </Hidden>
        <Hidden smDown>

          <a className="et-hero-tab" href="#tab-es6">
            FaceBook
            <FacebookIcon />
          </a>
          <a className="et-hero-tab" href="#tab-flexbox">
            Email
            <MailIcon />
          </a>
          <a className="et-hero-tab" href="#tab-react">
            WhatsApp
            <WhatsAppIcon />
          </a>
          <a className="et-hero-tab" href="#tab-angular">
            LinkedIN
            <LinkedInIcon />
          </a>
          {/* <a className="et-hero-tab" href="#tab-other">Other</a> */}
          <span className="et-hero-tab-slider"></span>
          </Hidden>

        </div>
      </section>
      <main className="et-main content">
        <section className="et-slide" id="tab-es6">
          <h1>FaceBook</h1>
          <h3>We have an online support group on FB - please check it out </h3>
          <a href="#">FaceBook Page AQUA-TEAM @ASU.SCI </a>
        </section>
        <section className="et-slide" id="tab-flexbox">
          <h1>Email</h1>
          <h3>Or you can email us to</h3>
          <a href="#"> Support@ASU.SCI </a>
        </section>
        <section className="et-slide" id="tab-react">
          <h1>WhatsApp</h1>
          <h3>Or you can text us to</h3>
          <a href="#"> +20-XXX-XXXX-XXX </a>
        </section>
        <section className="et-slide" id="tab-angular">
          <h1>LinkedIn</h1>
          <h3>Also you can know more info </h3>
          <a href="#"> AQUA Support Team </a>
        </section>
      </main>
    </div>
  );
}
