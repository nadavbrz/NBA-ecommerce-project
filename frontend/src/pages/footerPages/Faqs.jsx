import React, { useState } from 'react';
import classes from '../pagesStyles/Faqs.module.css';
import { Helmet } from "react-helmet-async";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What sizes are available for your NBA jerseys?',
      answer:
        'We offer a wide range of sizes from XS to XXXL, ensuring that fans of all shapes and sizes can find their perfect fit. Please refer to our size chart on each product page for accurate measurements.',
    },
    {
      question: 'Are your jerseys officially licensed by the NBA?',
      answer:
        'Yes, all our NBA jerseys are officially licensed and 100% authentic. We partner with reputable suppliers to bring you high-quality, genuine products.',
    },
    {
      question: 'Can I personalize a jersey with my name and number?',
      answer:
        'Absolutely! We offer customization options for select jerseys. Just choose the “Customize” option on the product page and enter your desired name and number.',
    },
    {
      question: 'How do I care for my NBA jersey?',
      answer:
        'To keep your jersey looking its best, we recommend machine washing it in cold water with similar colors. Avoid using bleach or fabric softeners, and tumble dry on low heat or hang dry.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy on all unused and unworn items. Please contact our support team for assistance with your return.',
    },
    {
      question: 'How long will it take to receive my order?',
      answer:
        'Standard shipping typically takes 5-7 business days. Expedited shipping options are available at checkout.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and other popular payment methods. You can see the full list of accepted payment methods at checkout.',
    },
    {
      question: 'How do I track my order?',
      answer:
        'Once your order has shipped, you will receive a confirmation email with a tracking number. Use that number to track your order on our website.',
    },
    {
      question: 'Can I cancel or change my order after it’s been placed?',
      answer:
        'If your order hasn’t been processed yet, you can cancel or modify it. Please contact our customer service as soon as possible for assistance.',
    },
  ];

  return (
    <>
    <Helmet>
      <title>Faqs Page</title>
    </Helmet>
    <div className={classes.faqContainer}>
      <h1 className={classes.faqTitle}>FAQs</h1>
      <ul className={classes.faqList}>
        {faqs.map((faq, index) => (
          <li key={index} className={classes.faqItem}>
            <h4
              onClick={() => toggleAnswer(index)}
              className={classes.faqQuestion}
            >
              {faq.question}
            </h4>
            {activeIndex === index && (
              <p className={classes.faqAnswer}>{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Faqs;
