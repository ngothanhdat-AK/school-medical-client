import React from "react";
import { useEffect } from "react";
import "./index.scss"; // Assuming you have a CSS file for styles
import blogImg1 from "../../assets/images/9.png";
import blogImg2 from "../../assets/images/10.png";
import blogImg3 from "../../assets/images/11.png";
import blogImg4 from "../../assets/images/12.png";
import blogImg5 from "../../assets/images/13.png";
import blogImg6 from "../../assets/images/14.png";
import blogImg7 from "../../assets/images/15.png";



const Resources = () => {
  const sections = [
  {
    title: "1. Measles - Mumps - Rubella (MMR)",
    img: blogImg1,
    alt: "MMR Vaccine",
    items: [
      "Measles: causes pneumonia, encephalitis, and death.",
      "Mumps: can cause infertility in males.",
      "Rubella: causes birth defects if infected during pregnancy.",
      "Vaccinate at 12-15 months and booster at 4-6 years."
    ]
  },
  {
    title: "2. Diphtheria - Pertussis - Tetanus (DTP)",
    img: blogImg2,
    alt: "DTP Vaccine",
    items: [
      "Diphtheria: damages heart and nervous system.",
      "Pertussis (Whooping cough): prolonged cough, respiratory failure.",
      "Tetanus: muscle stiffness, high mortality.",
      "Multiple doses starting at 2 months old."
    ]
  },
  {
    title: "3. Hepatitis B",
    img: blogImg3,
    alt: "Hepatitis B",
    items: [
      "Causes liver cirrhosis and liver cancer.",
      "Vaccinate within 24 hours after birth."
    ]
  },
  {
    title: "4. Haemophilus influenzae type b (Hib)",
    img: blogImg4,
    alt: "Hib Vaccine",
    items: [
      "Causes purulent meningitis in young children.",
      "Usually included in 5-in-1 or 6-in-1 vaccines."
    ]
  },
  {
    title: "5. Chickenpox",
    img: blogImg5,
    alt: "Chickenpox",
    items: [
      "Complications: pneumonia, encephalitis, skin infections.",
      "Vaccination helps reduce spread and complications."
    ]
  },
  {
    title: "6. Seasonal Flu",
    img: blogImg6,
    alt: "Seasonal Flu",
    items: [
      "Dangerous for elderly, young children, and people with underlying conditions.",
      "Annual vaccination to keep up with virus mutations."
    ]
  },
  {
    title: "7. COVID-19",
    img: blogImg7,
    alt: "COVID-19",
    items: [
      "Spreads rapidly, causes severe illness in people with underlying conditions.",
      "Vaccination reduces death and controls outbreaks."
    ]
  }
];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const hiddenElements = document.querySelectorAll(".vaccine-section, .highlight-section");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return   <div className="vaccination-container">
      <h1>Important Role of Vaccines</h1>

      <p>
        Vaccination is one of the most effective measures to prevent dangerous infectious diseases, 
        helping protect both individual and community health.
      </p>

      {sections.map((sec, index) => (
        <section key={index} className="vaccine-section hidden">
          <img src={sec.img} alt={sec.alt} />
          <div className="info">
            <h2>{sec.title}</h2>
            <ul>
              {sec.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="highlight-section hidden">
        <h2>Tại sao cần tiêm đầy đủ?</h2>
        <ul>
          <li>Bảo vệ bản thân khỏi mắc bệnh nguy hiểm.</li>
          <li>Bảo vệ cộng đồng và người không thể tiêm.</li>
          <li>Ngăn ngừa bùng phát dịch lớn.</li>
          <li>Tiết kiệm chi phí điều trị.</li>
        </ul>
      </section>

      <p className="note">
        Please follow the vaccination schedule 
        and get fully vaccinated to protect your own health and the community.
      </p>
    </div>
};

export default Resources;
