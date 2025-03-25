import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaLeaf, FaShieldAlt, FaCheckCircle, FaRecycle, FaUsers, FaSearch, FaClipboardList } from "react-icons/fa";

const features = [
    { icon: <FaSearch />, title: "Exclusivity in Sourcing", desc: "We stand out by not purchasing from the open market or traders. Instead, we meticulously source our products through exclusive channels, ensuring the highest quality and authenticity." },
    { icon: <FaLeaf />, title: "100% Natural Guarantee", desc: "Our commitment to providing only 100% natural products sets us apart. We prioritize the well-being of our customers by delivering goods free from artificial additives, preservatives, or synthetic substances." },
    { icon: <FaShieldAlt />, title: "Enhanced Resistance", desc: "Our products are curated with a focus on boosting immunity and increasing resistance. We understand the importance of a robust immune system in today's fast-paced world." },
    { icon: <FaCheckCircle />, title: "Quality Assurance", desc: "Rigorous quality control measures are implemented at every stage of production. From sourcing to packaging, our team ensures that each product adheres to the highest standards." },
    { icon: <FaClipboardList />, title: "Transparency in Processes", desc: "We believe in transparency and take pride in sharing information about our sourcing, production, and testing processes, building trust with our customers." },
    { icon: <FaUsers />, title: "Customer-Centric Approach", desc: "Your satisfaction is our priority. We are dedicated to meeting and exceeding your expectations, offering excellent customer service." },
    { icon: <FaRecycle />, title: "Environmentally Conscious Practices", desc: "Our practices are designed to minimize environmental impact, from eco-friendly packaging to responsible sourcing." },
    { icon: <FaLeaf />, title: "Continuous Research and Development", desc: "We stay at the forefront of advancements in health and wellness, ensuring our products evolve to meet the ever-changing needs of our customers." }
];

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us py-5" style={{ background: "#F4F4F9" }}>
      <div className="text-center mb-4">
        <motion.h2
          className="fw-bold text-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>
      </div>
      <Row lg={2} xs={1} md={2} className="px-lg-5 px-3">
        {features.map((feature, index) => (
          <Col key={index} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 shadow-sm rounded-lg"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <motion.span
                style={{ fontSize: "2rem", color: "#000066" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {feature.icon}
              </motion.span>
              <div>
                <h5 className="fw-bold text-dark">{feature.title}</h5>
                <p style={{ color: "#555", fontSize: "0.95rem", margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WhyChooseUs;
