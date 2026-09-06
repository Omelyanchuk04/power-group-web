"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FAQ.module.scss";

const faqData = [
  {
    question: "Скільки часу займає встановлення сонячної електростанції (СЕС)?",
    answer:
      "Від першого виїзду інженера до фінального запуску зазвичай проходить від 2 до 4 тижнів. Терміни залежать від потужності станції, складності монтажу (тип даху або наземна конструкція) та наявності специфічного обладнання. Проєктування та розрахунки ми робимо за 3-5 днів.",
  },
  {
    question: "Чи надаєте ви гарантію на електромонтажні роботи?",
    answer:
      "Так, ми впевнені у своїй експертизі, тому надаємо офіційну гарантію на всі виконані роботи до 5 років. Гарантія на саме обладнання (інвертори, акумулятори, автоматику) надається від виробників і складає від 5 до 25 років.",
  },
  {
    question: "Що обрати для резерву: генератор чи акумулятори (BESS)?",
    answer:
      "Це залежить від специфіки вашого об'єкту. Акумуляторні системи (BESS) забезпечують миттєве та безшумне перемикання, не потребують пального і можуть заряджатися від сонця. Генератори краще підходять для тривалих відключень (доба і більше). Найчастіше для бізнесу ми проєктуємо гібридні системи: ДБЖ + генератор.",
  },

  {
    question: "Яке обладнання ви використовуєте при збірці щитових?",
    answer:
      "Ми не економимо на безпеці, тому використовуємо комплектуючі виключно від перевірених світових брендів: Schneider Electric, Hager, Eaton, ETI, ABB. Кожен щит проходить суворе тестування під навантаженням перед відправкою на об'єкт.",
  },
  {
    question: "Чи робите ви аудит електромережі перед модернізацією?",
    answer:
      "Так, це обов'язковий етап. Наші інженери виїжджають на об'єкт, роблять заміри навантажень, проводять тепловізійне обстеження контактів та перевіряють опір ізоляції. Лише після цього ми складаємо кошторис на реконструкцію.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const qRefs = useRef([]);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        qRefs.current,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.faqSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`faq-header ${styles.header}`}>
          <span className={styles.badge}>FAQ</span>
          <h2 className={styles.title}>Часті запитання</h2>
          <p className={styles.subtitle}>
            Ми зібрали відповіді на питання, які найчастіше виникають у наших
            клієнтів перед початком співпраці.
          </p>
        </div>

        <div className={styles.faqWrapper}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                ref={(el) => (qRefs.current[index] = el)}
              >
                <button
                  className={styles.questionBtn}
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <div className={styles.iconWrapper}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.icon}
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>

                <div className={styles.answerWrapper}>
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
