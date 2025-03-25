import React from 'react';
import chimg7 from '../../Images/chocolate.gif';

const AboutUS = () => {
  return (
    <div className="mt-4 pt-xl-2 px-xl-4 pt-xxl-5 mt-xxl-5 text-center">
      <h1 className="aboutus">About Us</h1>
      <h3 className="pt-2 pb-4">
        We do Creative <br /> Things for Success
      </h3>

      <div className="row align-items-center">
        {/* Left-aligned paragraphs */}
        <div className="col-lg-5 text-lg-start text-center">
          <h5 className="fw-bold">A Foundation of Trust and Integrity</h5>
          <p>
            Trust is the cornerstone of our relationships, and we build it through transparency, integrity, and a customer-centric approach. At Elite Enterprise, we understand that trust is earned, and we strive to earn it with every interaction. Our commitment to ethical business practices sets us apart, fostering enduring partnerships with our clients.
          </p>

          <h5 className="fw-bold">Innovative Solutions for a Dynamic World</h5>
          <p>
            The business landscape is ever-evolving, and at Elite Enterprise, we thrive in this dynamic environment. Our passion for innovation drives us to stay at the forefront of industry trends, offering cutting-edge solutions that empower our clients to navigate the challenges of today and tomorrow.
          </p>
        </div>

        {/* Centered Image between paragraphs */}
        <div className="col-lg-2 d-flex justify-content-center">
  <img 
    className="img-fluid rounded-3 shadow-lg transition-transform hover:scale-105" 
    src={chimg7} 
    alt="Elite Enterprise" 
    style={{ transition: 'transform 0.3s ease-in-out' }}
  />
</div>

        {/* Right-aligned paragraphs */}
        <div className="col-lg-5 text-lg-start text-center">
          <h5 className="fw-bold">About Elite Enterprise</h5>
          <p>
            Welcome to Elite Enterprise, your trusted partner in delivering excellence. Based in the vibrant city of Mumbai, we stand as a beacon of innovation and reliability in the business landscape. At Elite Enterprise, we believe in not just meeting expectations but surpassing them, setting new benchmarks for quality and service in every endeavor.
          </p>

          <h5 className="fw-bold">Our Commitment to Excellence</h5>
          <p>
            Elite Enterprise is not just a business; it's a commitment to excellence. We take pride in our unwavering dedication to delivering top-tier products and services tailored to meet the diverse needs of our clients. Our team of professionals brings a wealth of expertise to the table, ensuring that every project, big or small, is executed with precision and finesse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
