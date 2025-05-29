import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import "./index.scss";
import slide1 from "../../assets/images/healt1.svg";
import slide2 from "../../assets/images/healt2.svg";
import news1 from "../../assets/news/news1.svg";
import news2 from "../../assets/news/news2.svg";
import news3 from "../../assets/news/news3.svg";
import news4 from "../../assets/news/news4.svg";
import {GiBandageRoll, GiNestedHearts} from "react-icons/gi";
import {MdHealthAndSafety, MdBloodtype} from "react-icons/md";
import {GoDotFill} from "react-icons/go";
import {CiHeart} from "react-icons/ci";
import {IoEyeOutline} from "react-icons/io5";

function HomePage() {
  return (
    <>
      <div className="">
        <div className="home__carousel ">
          <Carousel autoplay />
        </div>
        <div className="container">
          <div className="home__content">
            <div className="home__content-header">
              <p className="home__content-subtitle">CARE YOU CAN BELIEVE IN</p>
              <h1 className="home__content-title">
                All kids deserve to be healthy — in body and mind
              </h1>
            </div>
            <div className="home__content-main">
              <div className="home__content-left">
                <div className="home__content-menu">
                  <div className="home__content-menu-item">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div>
                        <span role="img" aria-label="checkup">
                          <GiBandageRoll size={35} color="#355383" />
                        </span>{" "}
                      </div>
                      <div className="home__content-menu-item-title">
                        Free Checkup
                      </div>
                    </div>
                  </div>
                  <div className="home__content-menu-item">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div>
                        <span role="img" aria-label="checkup">
                          <GiNestedHearts size={35} color="#355383" />
                        </span>{" "}
                      </div>
                      <div className="home__content-menu-item-title">
                        Cardiogram
                      </div>
                    </div>
                  </div>
                  <div className="home__content-menu-item">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div>
                        <span role="img" aria-label="checkup">
                          <MdHealthAndSafety size={35} color="#355383" />
                        </span>{" "}
                      </div>
                      <div className="home__content-menu-item-title">
                        Dna Testing
                      </div>
                    </div>
                  </div>
                  <div className="home__content-menu-item">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div>
                        <span role="img" aria-label="checkup">
                          <MdBloodtype size={35} color="#355383" />
                        </span>{" "}
                      </div>
                      <div className="home__content-menu-item-title">
                        Blood bank
                      </div>
                    </div>
                  </div>
                  <div className="home__content-menu-view">
                    <div className="service-btn view-all text-white font-[200]">
                      View All
                    </div>
                  </div>
                </div>
              </div>
              <div className="home__content-right">
                <h3>A passion for putting patients first.</h3>
                <div className="home__content-features">
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-2">
                      <GoDotFill size={35} color="#159eec" />
                      <div>A Passion for Healing</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill size={35} color="#159eec" />
                      <div>All our best</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill size={35} color="#159eec" />
                      <div>A Legacy of Excellence</div>
                    </li>
                  </ul>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-2">
                      <GoDotFill size={35} color="#159eec" />
                      <div>5-Star Care</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill size={35} color="#159eec" />
                      <div>Believe in Us</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <GoDotFill size={35} color="#159eec" />
                      <div>Always Caring</div>
                    </li>
                  </ul>
                </div>
                <p>
                  A passion for putting patients first is at the very heart of
                  exceptional healthcare. It goes beyond simply treating
                  illnesses or managing symptoms—it is about seeing each
                  individual as a unique person with their own story, fears, and
                  hopes. This passion drives healthcare professionals to listen
                  attentively, communicate clearly, and provide compassionate
                  care tailored to the specific needs of every patient. When
                  patients feel truly valued and understood, it builds trust,
                  reduces anxiety, and promotes better health outcomes.
                </p>
                <br />
                <p>
                  Putting patients first also means advocating for their rights,
                  ensuring their safety, and respecting their dignity at all
                  times. It requires constant dedication, empathy, and a
                  commitment to continuous learning so that care is not only
                  effective but also humane.
                </p>
              </div>
              <div className="home__content-images">
                <img src={slide1} alt="doctor-1" />
                <img src={slide2} alt="doctor-2" />
              </div>
            </div>
          </div>
          <div className="home__services">
            <div className="home__content-header">
              <p className="home__content-subtitle">
                Better information, Better health
              </p>
              <h1 className="home__content-title">NEWS</h1>
            </div>
            <div className="home__services-cards">
              <div className="home__services-card">
                <div className="home__services-card-image">
                  <img src={news1} alt="news1" />
                </div>
                <div className="home__services-card-content">
                  <span className="home__services-date">
                    24 April 2022 | Editor WHO
                  </span>
                  <h3 className="home__services-card-title">
                    <a
                      href="https://www.who.int/publications/i/item/9789290619376"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Global School-based Student Health Survey (GSHS 2019)
                    </a>
                  </h3>
                  <div className="home__services-card-meta">
                    <span className="flex gap-2">
                      <div>
                        <CiHeart size={20} color="#FF0000" />
                      </div>
                      <div className="text-black">86</div>
                    </span>
                    <span className="flex gap-2">
                      <div>
                        <IoEyeOutline size={20} color="#159eec" />
                      </div>
                      <div className="text-black">68</div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="home__services-card">
                <div className="home__services-card-image">
                  <img src={news2} alt="news2" />
                </div>
                <div className="home__services-card-content">
                  <span className="home__services-date">
                    September 4th 2018 | By David H. Foster
                  </span>
                  <h3 className="home__services-card-title">
                    <a
                      href="https://iris.who.int/handle/10665/344683"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      What is the effectiveness of the health promoting schools
                      approach?
                    </a>
                  </h3>
                  <div className="home__services-card-meta">
                    <span className="flex gap-2">
                      <div>
                        <CiHeart size={20} color="#FF0000" />
                      </div>
                      <div className="text-black">86</div>
                    </span>
                    <span className="flex gap-2">
                      <div>
                        <IoEyeOutline size={20} color="#159eec" />
                      </div>
                      <div className="text-black">68</div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="home__services-card">
                <div className="home__services-card-image">
                  <img src={news3} alt="news3" />
                </div>
                <div className="home__services-card-content">
                  <span className="home__services-date">
                    Monday 05, September 2021 | By Author
                  </span>
                  <h3 className="home__services-card-title">
                    <a
                      href="https://www.cdc.gov/assessing-improving-school-health/nutrition-pa/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Evidence-Based Strategies for School Nutrition and
                      Physical Activity
                    </a>
                  </h3>
                  <div className="home__services-card-meta">
                    <span className="flex gap-2">
                      <div>
                        <CiHeart size={20} color="#FF0000" />
                      </div>
                      <div className="text-black">86</div>
                    </span>
                    <span className="flex gap-2">
                      <div>
                        <IoEyeOutline size={20} color="#159eec" />
                      </div>
                      <div className="text-black">68</div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="home__services-card">
                <div className="home__services-card-image">
                  <img src={news4} alt="news4" />
                </div>
                <div className="home__services-card-content">
                  <span className="home__services-date">
                    Monday 05, September 2021 | By Author
                  </span>
                  <h3 className="home__services-card-title">
                    <a
                      href="https://pubmed.ncbi.nlm.nih.gov/33818772/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Interventions for Improving the Health of School-Aged
                      Children and Adolescents
                    </a>
                  </h3>
                  <div className="home__services-card-meta">
                    <span className="flex gap-2">
                      <div>
                        <CiHeart size={20} color="#FF0000" />
                      </div>
                      <div className="text-black">86</div>
                    </span>
                    <span className="flex gap-2">
                      <div>
                        <IoEyeOutline size={20} color="#159eec" />
                      </div>
                      <div className="text-black">68</div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
