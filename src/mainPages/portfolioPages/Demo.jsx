import React, { useEffect } from "react";

// Preloader Component
const Preloader = () => {
  return (
    <div className="preloader fixed inset-0 flex items-center justify-center z-[99999999999999] overflow-hidden">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute top-0 w-screen h-[110vh] fill-[#111013]"
      >
        <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>
      <h5 className="preloader-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[calc(80px+5vw)] text-[#333] font-semibold">
        Pixelor
      </h5>
    </div>
  );
};

// Header Component
const Header = () => {
  const [isSticky, setIsSticky] = React.useState(false);

  return (
    <header
      className={`th-header-area bg-[#121212] py-6 ${isSticky ? "header-sticky fixed top-0 left-0 w-full z-99 shadow-md animate-[stickyanimations_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_both]" : ""}`}
    >
      <div className="th-header-wrapper flex items-center justify-between px-[100px] max-[1600px]:px-[50px] max-[1400px]:px-5 max-[767px]:px-[15px] max-[575px]:px-2.5">
        <div className="th-logo-menu-area flex items-center gap-[120px] max-[1600px]:gap-[60px]">
          <div className="th-logo">
            <a href="index.html">
              <img
                src="assets/img/logo/th-logo-white.png"
                alt="Logo"
                className="w-[150px]"
              />
            </a>
          </div>
          <div className="th-main-menu bg-[#0E0E0E] rounded-[64px] px-6 max-[1200px]:hidden">
            <nav>
              <ul className="flex">
                <li className="group relative inline-block mr-6 max-[1400px]:mr-2.5">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-semibold py-4 inline-block hover:text-[#DEFF00] transition duration-300"
                  >
                    HOME{" "}
                    <span className="menu-dwn-arrow text-sm">
                      <i className="fa-regular fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu absolute top-[105%] w-[200px] left-0 bg-[#0E0E0E] rounded-md py-4 opacity-0 invisible shadow-lg transition duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-full z-10">
                    <li className="block text-left ml-6">
                      <a
                        href="index.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Home-01
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="index-2.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Home-02
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="index-3.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Home-03
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="inline-block mr-6 max-[1400px]:mr-2.5">
                  <a
                    href="about.html"
                    className="text-[#FBFBFB] text-base leading-6 font-semibold py-4 inline-block hover:text-[#DEFF00] transition duration-300"
                  >
                    ABOUT ME
                  </a>
                </li>
                <li className="group relative inline-block mr-6 max-[1400px]:mr-2.5">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-semibold py-4 inline-block hover:text-[#DEFF00] transition duration-300"
                  >
                    PAGES{" "}
                    <span className="menu-dwn-arrow text-sm">
                      <i className="fa-regular fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu absolute top-[105%] w-[200px] left-0 bg-[#0E0E0E] rounded-md py-4 opacity-0 invisible shadow-lg transition duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-full z-10">
                    <li className="block text-left ml-6">
                      <a
                        href="service.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Service
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="service-details.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Service Details
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="testimonial.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Testimonial
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="404.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        404
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="group relative inline-block mr-6 max-[1400px]:mr-2.5">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-semibold py-4 inline-block hover:text-[#DEFF00] transition duration-300"
                  >
                    PROJECTS{" "}
                    <span className="menu-dwn-arrow text-sm">
                      <i className="fa-regular fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu absolute top-[105%] w-[200px] left-0 bg-[#0E0E0E] rounded-md py-4 opacity-0 invisible shadow-lg transition duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-full z-10">
                    <li className="block text-left ml-6">
                      <a
                        href="portfolio.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Portfolio
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="portfolio-details.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Portfolio Details
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="group relative inline-block mr-6 max-[1400px]:mr-2.5">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-semibold py-4 inline-block hover:text-[#DEFF00] transition duration-300"
                  >
                    BLOG{" "}
                    <span className="menu-dwn-arrow text-sm">
                      <i className="fa-regular fa-angle-down"></i>
                    </span>
                  </a>
                  <ul className="sub-menu absolute top-[105%] w-[200px] left-0 bg-[#0E0E0E] rounded-md py-4 opacity-0 invisible shadow-lg transition duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-full z-10">
                    <li className="block text-left ml-6">
                      <a
                        href="blog-classic.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Blog Classic
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="blog.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="block text-left ml-6">
                      <a
                        href="blog-details.html"
                        className="block py-2 text-[#FBFBFB] hover:text-[#DEFF00]"
                      >
                        Blog Details
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="inline-block">
                  <a
                    href="contact.html"
                    className="text-[#FBFBFB] text-base leading-6 font-semibold py-4 inline-block hover:text-[#DEFF00] transition duration-300"
                  >
                    CONTACT US
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="th-header-top-btn-flex flex items-center gap-6">
          <div className="th-header-btn max-[767px]:hidden">
            <a
              href="contact.html"
              className="th-primary-btn inline-block transition duration-300 hover:-translate-y-1 group"
            >
              <span className="th-icon bg-[#DEFF00] h-14 w-14 leading-[56px] text-center rounded-[56px] inline-block transition duration-300 group-hover:bg-white">
                <img src="assets/img/icon/th-footer-btn-icon.png" alt="Icon" />
              </span>
              <span className="th-text px-8 py-4 bg-[#DEFF00] inline-block text-base leading-6 font-semibold transition duration-300 rounded-[56px] -ml-1.5 text-black group-hover:bg-white uppercase">
                Hire Me now
              </span>
            </a>
          </div>
          <div className="th-header-action-item">
            <a
              href="#"
              className="th-menu-btn th-offcanvas-toggle text-[#b4b2b2] text-base leading-6 font-semibold border border-[#2f2f2f] px-8 py-4 rounded-[100px] inline-block transition duration-300 hover:text-[#DEFF00] hover:border-[#DEFF00]"
            >
              MENU{" "}
              <span>
                <img
                  src="assets/img/icon/th-menu.svg"
                  alt="Menu"
                  className="inline ml-1"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

// MouseCursor Component
const MouseCursor = () => {
  useEffect(() => {
    const cursorOuter = document.querySelector(".cursor-outer");
    const cursorInner = document.querySelector(".cursor-inner");

    if (!cursorOuter || !cursorInner) return;

    const handleMouseMove = (e) => {
      cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleMouseEnter = () => {
      cursorOuter.classList.add("cursor-hover");
      cursorInner.classList.add("cursor-hover");
    };

    const handleMouseLeave = () => {
      cursorOuter.classList.remove("cursor-hover");
      cursorInner.classList.remove("cursor-hover");
    };

    const links = document.querySelectorAll("a, button, .cursor-pointer");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="mouseCursor cursor-outer fixed top-0 left-0 pointer-events-none rounded-full transform translate-z-0 invisible text-center w-[30px] h-[30px] -ml-3 -mt-3 border border-[#DEFF00] bg-transparent z-[10000000] opacity-34 transition-all duration-400 ease-out"></div>
      <div className="mouseCursor cursor-inner fixed top-0 left-0 pointer-events-none rounded-full transform translate-z-0 invisible text-center w-2.5 h-2.5 -ml-[3px] -mt-[3px] bg-[#DEFF00] z-[10000001] transition-all duration-240 ease-out"></div>
    </>
  );
};

// OffcanvasMenu Component
const OffcanvasMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const toggleBtn = document.querySelector(".th-offcanvas-toggle");
    const closeBtn = document.querySelector(".th-offcanvas-close-toggle");
    const overlay = document.querySelector(".th-offcanvas-overlay");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        setIsOpen(true);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => setIsOpen(false));
    }

    if (overlay) {
      overlay.addEventListener("click", () => setIsOpen(false));
    }

    return () => {
      if (toggleBtn)
        toggleBtn.removeEventListener("click", () => setIsOpen(true));
      if (closeBtn)
        closeBtn.removeEventListener("click", () => setIsOpen(false));
      if (overlay) overlay.removeEventListener("click", () => setIsOpen(false));
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`th-offcanvas fixed bg-white w-[450px] max-[450px]:w-full z-[999] right-0 top-0 px-10 py-[50px] h-full overflow-y-auto transition duration-300 ${isOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"}`}
      >
        <div className="th-offcanvas-wrapper">
          <div className="th-offcanvas-header flex justify-between items-center mb-[50px]">
            <div className="th-offcanvas-logo">
              <a href="index.html">
                <img src="assets/img/logo/th-block-black1.1.png" alt="Logo" />
              </a>
            </div>
            <div className="th-offcanvas-close">
              <button className="th-offcanvas-close-toggle text-3xl text-[#222]">
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>

          <div className="th-offcanvas-content mb-10">
            <h2 className="th-offcanvas-title text-[28px] leading-7 mb-2.5 font-bold text-[#222]">
              Hello There
            </h2>
            <p className="th-offcanvas-para text-lg leading-[26px] text-[#666]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
          </div>

          <div className="th-offcanvas-gallery grid grid-cols-4 gap-2.5 mb-10">
            <a
              className="popup-image"
              href="assets/img/devceloper/th-blog-thumb2.1.png"
            >
              <img
                className="w-full"
                src="assets/img/devceloper/th-blog-thumb2.1.png"
                alt="Gallery"
              />
            </a>
            <a
              className="popup-image"
              href="assets/img/devceloper/th-blog-thumb2.2.png"
            >
              <img
                className="w-full"
                src="assets/img/devceloper/th-blog-thumb2.2.png"
                alt="Gallery"
              />
            </a>
            <a
              className="popup-image"
              href="assets/img/devceloper/th-blog-thumb2.1.png"
            >
              <img
                className="w-full"
                src="assets/img/devceloper/th-blog-thumb2.1.png"
                alt="Gallery"
              />
            </a>
            <a
              className="popup-image"
              href="assets/img/devceloper/th-blog-thumb2.2.png"
            >
              <img
                className="w-full"
                src="assets/img/devceloper/th-blog-thumb2.2.png"
                alt="Gallery"
              />
            </a>
          </div>

          <div className="th-offcanvas-info mb-[30px]">
            <h3 className="th-offcanvas-title text-[28px] leading-7 mb-5 font-bold text-[#222]">
              Contact Us
            </h3>
            <a
              href="#"
              className="block mb-[18px] text-lg leading-[18px] hover:text-[#DEFF00]"
            >
              +57-9954-6476
            </a>
            <a
              href="#"
              className="block mb-[18px] text-lg leading-[18px] hover:text-[#DEFF00]"
            >
              hello@Pixelor.com
            </a>
            <a
              href="#"
              className="block mb-[18px] text-lg leading-[18px] hover:text-[#DEFF00]"
            >
              Los Angles,California
            </a>
          </div>

          <div className="th-offcanvas-social mb-[30px]">
            <h3 className="th-offcanvas-title text-[28px] leading-7 mb-5 font-bold text-[#222]">
              Follow Us
            </h3>
            <a
              href="#"
              className="inline-block text-center w-10 h-10 leading-10 rounded-[40px] text-[#222] border border-[rgba(2,11,24,0.1)] text-sm transition duration-300 hover:bg-[#333] hover:text-white mr-2"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="inline-block text-center w-10 h-10 leading-10 rounded-[40px] text-[#222] border border-[rgba(2,11,24,0.1)] text-sm transition duration-300 hover:bg-[#333] hover:text-white mr-2"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="inline-block text-center w-10 h-10 leading-10 rounded-[40px] text-[#222] border border-[rgba(2,11,24,0.1)] text-sm transition duration-300 hover:bg-[#333] hover:text-white mr-2"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="#"
              className="inline-block text-center w-10 h-10 leading-10 rounded-[40px] text-[#222] border border-[rgba(2,11,24,0.1)] text-sm transition duration-300 hover:bg-[#333] hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`th-offcanvas-overlay fixed top-0 left-0 z-[100] w-full h-full invisible opacity-0 transition duration-450 bg-[#181818] ${isOpen ? "opacity-90 visible" : ""}`}
      ></div>
    </>
  );
};

// Breadcrumb Component
const Breadcrumb = () => {
  return (
    <section
      className="th-breadcrumb-area pt-[244px] pb-[164px] max-[991px]:pt-40 max-[991px]:pb-[110px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('assets/img/designer/th-breadcrumb-bg.png')",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="row flex justify-center">
          <div className="col-xl-6 text-center">
            <div className="th-breadcrumb-content">
              <h2 className="th-breadcrumb-title text-[#FAF2EE] text-[72px] leading-[80px] font-bold mb-6 max-[991px]:text-4xl max-[991px]:leading-[50px] max-[575px]:text-[35px] max-[575px]:leading-[45px]">
                Project Details
              </h2>
              <ul>
                <li className="inline-block text-[#FAF2EE]">
                  <a
                    href="index.html"
                    className="text-[#FAF2EE] text-xl leading-7 font-semibold opacity-70 hover:text-[#DEFF00] transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li className="inline-block text-[#FAF2EE]">
                  <span className="mx-1">
                    <i className="fa-solid fa-angle-right"></i>
                  </span>
                </li>
                <li className="inline-block text-[#FAF2EE]">
                  <a
                    href="#"
                    className="active text-[#FAF2EE] text-xl leading-7 font-semibold opacity-100"
                  >
                    Project Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ProjectDetails Component
const ProjectDetails = () => {
  return (
    <section className="th-service-iconbox-wrap pt-32 pb-[90px] max-[991px]:pt-16 max-[991px]:pb-[50px]">
      <div className="container mx-auto px-4">
        {/* Large Thumbnail */}
        <div className="th-service-large-thumb th-service-large-thumb-2 image-anime mb-[30px] relative overflow-hidden">
          <img
            className="w-full rounded-2xl h-[664px] max-[991px]:h-auto object-cover"
            src="assets/img/designer/th-project-large-thumb-3.1.png"
            alt="Project Large"
          />
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-8/12 px-4">
            <div className="th-service-large-content-wrap">
              <div className="service-lar-content-box-1 mb-6">
                <h4 className="th-title-top text-[#DEFF00] text-lg leading-[26px] font-semibold pb-2">
                  Project Name: Zenrix
                </h4>
                <h2 className="th-title text-[#FBFBFB] text-[40px] leading-[48px] font-bold pb-4 max-[575px]:text-[34px] max-[575px]:leading-[44px]">
                  Digital Agency Website
                </h2>
                <p className="th-para text-[#B4B2B2] text-base leading-6 font-normal">
                  <span className="text-[#DEFF00]">Zenrix</span> is a modern
                  digital agency website designed to showcase creativity,
                  services, and client success. With a clean, responsive layout,
                  interactive elements, and a visually engaging portfolio, it
                  highlights the agency’s expertise in branding, web design, and
                  marketing. The website enhances user experience through smooth
                  navigation, clear content hierarchy, and compelling visuals,
                  helping attract clients, communicate value effectively, and
                  drive meaningful business growth.
                </p>
              </div>

              <div className="service-lar-content-box-1 mb-[30px]">
                <h2 className="th-title th-title-2 text-[#FBFBFB] text-[32px] leading-10 font-bold">
                  Project Overview:
                </h2>
                <p className="th-para text-[#B4B2B2] text-base leading-6 font-normal">
                  Zenrix is a modern, fully responsive website designed for a
                  digital agency to showcase services, portfolio, and client
                  success stories. The goal was to create a clean, professional,
                  and user-friendly experience that reflects the agency’s
                  creativity and expertise.
                </p>
              </div>

              <div className="service-lar-content-box-1 mb-[30px]">
                <h2 className="th-title th-title-2 text-[#FBFBFB] text-[32px] leading-10 font-bold">
                  Key Features:
                </h2>
                <ul>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Fully responsive design across desktop, tablet, and mobile
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Interactive hero section with animated visuals
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Services showcase with icons and brief descriptions
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Portfolio section highlighting projects and case studies
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Blog section for insights and updates
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Client testimonials carousel
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Contact form with CTA for inquiries and leads
                  </li>
                  <li className="text-[#B4B2B2] text-lg leading-[26px] mb-4 flex items-start">
                    <span>
                      <img
                        src="assets/img/designer/th-double-arrow.png"
                        alt=""
                        className="mr-2 mt-1"
                      />
                    </span>
                    Smooth transitions, micro-interactions, and modern UI
                    elements
                  </li>
                </ul>
              </div>

              <div className="service-lar-content-box-1 mb-[30px]">
                <h2 className="th-title th-title-2 text-[#FBFBFB] text-[32px] leading-10 font-bold">
                  Design Focus:
                </h2>
                <p className="th-para text-[#B4B2B2] text-base leading-6 font-normal">
                  The design focus centered on creating a seamless balance
                  between creativity and usability. Every element, from
                  typography to color palette, was chosen to strengthen brand
                  identity and guide users effortlessly. With a minimalist
                  layout, engaging visuals, and intuitive navigation, the
                  website ensures clarity, professionalism, and a memorable
                  digital experience.
                </p>
              </div>

              {/* Small Thumbnails */}
              <div className="th-sm-thumb-wrap">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full md:w-6/12 px-4 mb-[30px]">
                    <div className="th-service-sm-thumb image-anime relative overflow-hidden">
                      <img
                        className="w-full rounded-2xl"
                        src="assets/img/designer/th-project-sm-3.1.png"
                        alt="Project Small"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-6/12 px-4 mb-[30px]">
                    <div className="th-service-sm-thumb image-anime relative overflow-hidden">
                      <img
                        className="w-full rounded-2xl"
                        src="assets/img/designer/th-project-sm-3.2.png"
                        alt="Project Small"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="service-lar-content-box-1 mb-[30px]">
                <h2 className="th-title th-title-2 text-[#FBFBFB] text-[32px] leading-10 font-bold">
                  Outcome:
                </h2>
                <p className="th-para text-[#B4B2B2] text-base leading-6 font-normal">
                  The website now provides a visually appealing,
                  easy-to-navigate platform that effectively communicates
                  services, engages visitors, and generates client leads.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-4/12 px-4">
            <div className="th-service-widget-area sticky top-[150px]">
              {/* Widget 1 - Project Information */}
              <div className="th-service-widget-1 bg-[#0E0E0E] p-8 rounded-2xl border border-[#2C2C2C] mb-[30px]">
                <h3 className="th-title text-[#FBFBFB] text-2xl leading-8 font-bold relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-20 after:h-[3px] after:bg-[#DEFF00] after:rounded-[64px]">
                  Project Information
                </h3>
                <div className="th-mt-6 mt-6">
                  <div className="th-user-sidebar">
                    <div className="th-sidebar-flex flex items-center">
                      <div className="th-sidebar-flex-icon mr-6">
                        <img
                          src="assets/img/icon/th-sidebar-icon1.1.png"
                          alt="Icon"
                        />
                      </div>
                      <div className="th-sidebar-flex-content">
                        <p className="th-para text-[#B4B2B2] text-sm leading-5 pb-0.5">
                          Clients:
                        </p>
                        <h2 className="th-titlee text-[#FBFBFB] text-lg leading-[26px] font-semibold">
                          Queen_Tex
                        </h2>
                      </div>
                    </div>
                    <div className="th-border-img pt-4 mb-4">
                      <img
                        className="w-full"
                        src="assets/img/icon/th-thumb-border2.1.png"
                        alt="Border"
                      />
                    </div>
                  </div>

                  <div className="th-user-sidebar">
                    <div className="th-sidebar-flex flex items-center">
                      <div className="th-sidebar-flex-icon mr-6">
                        <img
                          src="assets/img/icon/th-sidebar-icon1.2.png"
                          alt="Icon"
                        />
                      </div>
                      <div className="th-sidebar-flex-content">
                        <p className="th-para text-[#B4B2B2] text-sm leading-5 pb-0.5">
                          Project Date:
                        </p>
                        <h2 className="th-titlee text-[#FBFBFB] text-lg leading-[26px] font-semibold">
                          16 October, 2026
                        </h2>
                      </div>
                    </div>
                    <div className="th-border-img pt-4 mb-4">
                      <img
                        className="w-full"
                        src="assets/img/icon/th-thumb-border2.1.png"
                        alt="Border"
                      />
                    </div>
                  </div>

                  <div className="th-user-sidebar">
                    <div className="th-sidebar-flex flex items-center">
                      <div className="th-sidebar-flex-icon mr-6">
                        <img
                          src="assets/img/icon/th-sidebar-icon1.3.png"
                          alt="Icon"
                        />
                      </div>
                      <div className="th-sidebar-flex-content">
                        <p className="th-para text-[#B4B2B2] text-sm leading-5 pb-0.5">
                          Categories:
                        </p>
                        <h2 className="th-titlee text-[#FBFBFB] text-lg leading-[26px] font-semibold">
                          UI/UX Design
                        </h2>
                      </div>
                    </div>
                    <div className="th-border-img pt-4 mb-4">
                      <img
                        className="w-full"
                        src="assets/img/icon/th-thumb-border2.1.png"
                        alt="Border"
                      />
                    </div>
                  </div>

                  <div className="th-user-sidebar">
                    <div className="th-sidebar-flex flex items-center">
                      <div className="th-sidebar-flex-icon mr-6">
                        <img
                          src="assets/img/icon/th-sidebar-icon1.4.png"
                          alt="Icon"
                        />
                      </div>
                      <div className="th-sidebar-flex-content">
                        <p className="th-para text-[#B4B2B2] text-sm leading-5 pb-0.5">
                          Budgets:
                        </p>
                        <h2 className="th-titlee text-[#FBFBFB] text-lg leading-[26px] font-semibold">
                          $45,00,000
                        </h2>
                      </div>
                    </div>
                    <div className="th-border-img pt-4 mb-4">
                      <img
                        className="w-full"
                        src="assets/img/icon/th-thumb-border2.1.png"
                        alt="Border"
                      />
                    </div>
                  </div>

                  <div className="th-social-mainflex flex justify-between items-center max-[575px]:flex-col">
                    <div className="th-social-mainflex-text">
                      <p className="th-titlew text-[#FBFBFB] text-base leading-6 font-normal max-[575px]:mb-5">
                        Social Icon
                      </p>
                    </div>
                    <div className="th-social-mainflex-icon">
                      <a
                        href="#"
                        className="bg-[#121212] w-9 h-9 leading-9 text-center rounded-full inline-block text-[#FBFBFB] transition duration-300 hover:bg-[#DEFF00] hover:text-[#121212] ml-4 max-[575px]:mx-2"
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a
                        href="#"
                        className="bg-[#121212] w-9 h-9 leading-9 text-center rounded-full inline-block text-[#FBFBFB] transition duration-300 hover:bg-[#DEFF00] hover:text-[#121212] ml-4 max-[575px]:mx-2"
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                      <a
                        href="#"
                        className="bg-[#121212] w-9 h-9 leading-9 text-center rounded-full inline-block text-[#FBFBFB] transition duration-300 hover:bg-[#DEFF00] hover:text-[#121212] ml-4 max-[575px]:mx-2"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a
                        href="#"
                        className="bg-[#121212] w-9 h-9 leading-9 text-center rounded-full inline-block text-[#FBFBFB] transition duration-300 hover:bg-[#DEFF00] hover:text-[#121212] ml-4 max-[575px]:mx-2"
                      >
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 2 - Brochure Download */}
              <div className="th-service-widget-1 bg-[#0E0E0E] p-8 rounded-2xl border border-[#2C2C2C] mb-[30px]">
                <h3 className="th-title text-[#FBFBFB] text-2xl leading-8 font-bold relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-20 after:h-[3px] after:bg-[#DEFF00] after:rounded-[64px]">
                  Brochure Download
                </h3>
                <div className="th-mt-6 mt-6">
                  <p className="th-para text-[#B4B2B2] text-base leading-6 font-normal">
                    Click the download button to obtain the brochure file.
                  </p>
                </div>
                <a
                  href="#"
                  className="th-primary-btn th-primary-btn-secondary2 inline-block transition duration-300 hover:-translate-y-1 group mt-10"
                >
                  <span className="th-icon bg-[#DEFF00] h-14 w-14 leading-[56px] text-center rounded-[56px] inline-block transition duration-300 group-hover:bg-white border border-[#DEFF00]">
                    <img
                      src="assets/img/icon/th-footer-btn-icon.png"
                      alt="Icon"
                      className="filter brightness-0"
                    />
                  </span>
                  <span className="th-text px-8 py-4 bg-transparent inline-block text-base leading-6 font-semibold transition duration-300 rounded-[56px] -ml-1.5 text-[#DEFF00] border border-[#DEFF00] group-hover:bg-white group-hover:text-black uppercase">
                    Download PDF
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer
      className="th-footer-area pt-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('assets/img/footer/th-footer-bg.png')" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-6/12 text-center">
            <div className="th-footer-btn-wrap flex justify-center gap-6 pb-12 max-[575px]:flex-col max-[991px]:pb-[30px]">
              <a
                href="contact.html"
                className="th-primary-btn inline-block transition duration-300 hover:-translate-y-1 group"
                data-aos="fade-up"
              >
                <span className="th-icon bg-[#DEFF00] h-14 w-14 leading-[56px] text-center rounded-[56px] inline-block transition duration-300 group-hover:bg-white">
                  <img src="assets/img/icon/download.png" alt="Icon" />
                </span>
                <span className="th-text px-8 py-4 bg-[#DEFF00] inline-block text-base leading-6 font-semibold transition duration-300 rounded-[56px] -ml-1.5 text-black group-hover:bg-white">
                  DOWNLOAD CV
                </span>
              </a>

              <a
                href="contact.html"
                className="th-primary-btn th-primary-btn-secondary inline-block transition duration-300 hover:-translate-y-1 group"
              >
                <span className="th-icon bg-transparent border border-[#DEFF00] h-14 w-14 leading-[56px] text-center rounded-[56px] inline-block transition duration-300 group-hover:bg-white group-hover:border-black">
                  <img
                    src="assets/img/icon/th-footer-btn-icon.png"
                    alt="Icon"
                    className="transition duration-300 group-hover:filter group-hover:brightness-0"
                  />
                </span>
                <span className="th-text px-8 py-4 bg-transparent inline-block text-base leading-6 font-semibold transition duration-300 rounded-[56px] -ml-1.5 text-[#DEFF00] border border-[#DEFF00] group-hover:bg-white group-hover:text-black">
                  CONTACT ME
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full md:w-3/12 px-4">
            <div className="th-footer-left-logo mb-12 max-[575px]:text-center max-[575px]:mb-[30px]">
              <img src="assets/img/logo/th-logo-white.png" alt="Logo" />
            </div>
          </div>
          <div className="w-full md:w-6/12 px-4 text-center">
            <h2 className="th-footer-mail-title text-[#FBFBFB] text-[64px] leading-[72px] font-bold transition duration-300 hover:text-[#DEFF00] mb-12 max-[991px]:text-[40px] max-[991px]:leading-[50px] max-[575px]:text-center max-[575px]:mb-[30px]">
              <a href="mailto:pixelor@gmail.com">pixelor@gmail.com</a>
            </h2>
          </div>
          <div className="w-full md:w-3/12 px-4">
            <h3 className="th-opentowork text-[#DEFF00] text-lg leading-[26px] font-semibold text-right max-[575px]:text-center max-[575px]:mb-[30px]">
              <span className="relative inline-block w-2 h-2 bg-[#DEFF00] rounded-full mr-4 after:absolute after:content-[''] after:border after:border-[#DEFF00] after:p-2.5 after:-left-1.5 after:-top-1.5 after:rounded-full"></span>
              Opent To Work
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-6/12 text-center lg:text-left">
            <div className="th-footer-widget-1 mb-[30px]">
              <div className="th-footer-menu">
                <ul className="flex flex-wrap justify-center lg:justify-start">
                  <li className="inline-block">
                    <a
                      href="index.html"
                      className="font-semibold text-base leading-6 uppercase mr-12 text-white transition duration-300 hover:text-[#DEFF00] max-[575px]:mx-1.5 max-[575px]:text-xs"
                    >
                      Home
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="#"
                      className="font-semibold text-base leading-6 uppercase mr-12 text-white transition duration-300 hover:text-[#DEFF00] max-[575px]:mx-1.5 max-[575px]:text-xs"
                    >
                      Pages
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="portfolio-details.html"
                      className="font-semibold text-base leading-6 uppercase mr-12 text-white transition duration-300 hover:text-[#DEFF00] max-[575px]:mx-1.5 max-[575px]:text-xs"
                    >
                      Project
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="blog-classic.html"
                      className="font-semibold text-base leading-6 uppercase mr-12 text-white transition duration-300 hover:text-[#DEFF00] max-[575px]:mx-1.5 max-[575px]:text-xs"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="contact.html"
                      className="font-semibold text-base leading-6 uppercase text-white transition duration-300 hover:text-[#DEFF00] max-[575px]:mx-1.5 max-[575px]:text-xs"
                    >
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 text-center lg:text-right">
            <div className="th-footer-widget-2 mb-[30px]">
              <div className="th-footer-social">
                <ul>
                  <li className="inline-block">
                    <a
                      href="#"
                      className="uppercase text-[#9B9B9B] text-base leading-6 font-semibold ml-12 relative transition duration-300 hover:text-[#DEFF00] hover:border-b border-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-2 after:absolute after:content-[''] after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-[#9B9B9B] hover:after:bg-[#DEFF00]"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="#"
                      className="uppercase text-[#9B9B9B] text-base leading-6 font-semibold ml-12 relative transition duration-300 hover:text-[#DEFF00] hover:border-b border-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-2 after:absolute after:content-[''] after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-[#9B9B9B] hover:after:bg-[#DEFF00]"
                    >
                      Linkedin
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="#"
                      className="uppercase text-[#9B9B9B] text-base leading-6 font-semibold ml-12 relative transition duration-300 hover:text-[#DEFF00] hover:border-b border-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-2 after:absolute after:content-[''] after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-[#9B9B9B] hover:after:bg-[#DEFF00]"
                    >
                      Twitter
                    </a>
                  </li>
                  <li className="inline-block">
                    <a
                      href="#"
                      className="uppercase text-[#9B9B9B] text-base leading-6 font-semibold ml-12 relative transition duration-300 hover:text-[#DEFF00] hover:border-b border-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-2 after:absolute after:content-[''] after:-left-4 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-[#9B9B9B] hover:after:bg-[#DEFF00]"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="th-footer-border border-[#2F302C] my-[18px]" />

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-6/12 px-4">
            <div className="th-copyright mb-10">
              <p className="th-copyright-text text-[#FBFBFB] text-base leading-6 font-normal max-[575px]:text-center max-[575px]:text-xs">
                Copyright © 2026{" "}
                <a href="index.html" className="text-[#DEFF00]">
                  Pixelor
                </a>
                , All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="w-full md:w-6/12 px-4 text-right max-[575px]:text-center">
            <div className="th-copyright-menu mb-10">
              <ul>
                <li className="inline-block">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-normal ml-[35px] transition duration-300 hover:text-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-1.5"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-normal ml-[35px] transition duration-300 hover:text-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-1.5"
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li className="inline-block">
                  <a
                    href="#"
                    className="text-[#FBFBFB] text-base leading-6 font-normal ml-[35px] transition duration-300 hover:text-[#DEFF00] max-[575px]:text-xs max-[575px]:mx-1.5"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <a href="contact.html" className="block" data-aos="fade-up">
          <div className="footer-large-title mb-[30px]">
            <h3 className="footer-title text-white text-[346px] leading-none font-bold inline-block max-[1200px]:text-[244px] max-[991px]:text-[182px] max-[575px]:text-[90px]">
              PIXELOR
            </h3>
          </div>
        </a>
      </div>
    </footer>
  );
};

const Demo = () => {
  return (
    <div>
      <div className="font-sans bg-black overflow-x-hidden">
        {/* <Preloader /> */}
        {/* <Header /> */}
        {/* <MouseCursor /> */}
        <OffcanvasMenu />
        <main
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('assets/img/designer/th-designer-bg.png')",
          }}
        >
          <Breadcrumb />
          <ProjectDetails />
        </main>
        <Footer />
        {/* <BackToTop /> */}
      </div>
    </div>
  );
};

export default Demo;
