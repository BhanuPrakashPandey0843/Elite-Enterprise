import React from "react";
import blimg from "../../Images/image 55.png";

import { FaUserAlt, FaArrowRight } from "react-icons/fa";
import { Card, Col, Row } from "react-bootstrap";
import "./Blogpage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../Globalvarible";
import DOMPurify from "dompurify";

const Blogpage = () => {
  const [blogimgs, setBlogimgs] = useState([]);
  const navigate = useNavigate();
  const handlclick = (blogData) => {
    window.scrollTo(0, 0);
    navigate("/singleblog", { state: { blogData } });
  };

  useEffect(() => {
    fetch(baseUrl + "GetBlogs.php")
      .then((resp) => resp.json())
      .then((res) => setBlogimgs(res.data));
  }, []);

  return (
    <div className="blogcls mb-5 mb-lg-0 mb-md-0">
      <div className="position-relative">
        <img
          src={blimg}
          width="100%"
          style={{ height: "250px" }}
          alt="Blog Header"
        />
        <h3
          className="position-absolute top-50 start-50 translate-middle fw-bolder"
          style={{ color: "white" }}
        >
          Blogs
        </h3>
      </div>

      {/* blog cards section */}
      <div className="pt-lg-5 px-lg-5 mx-lg-5">
        <Row
          xs={1}
          md={2}
          lg={2}
          className="px-xl-5 crow mx-lg-5 g-4 mx-4 mt-5"
        >
          {blogimgs.map((item, i) => (
            <Col key={i} className="justify-content-center ccol">
              <Card
                className="rounded-2 position-relative mb-5 pb-5"
                style={{ border: "none" }}
              >
                <Card.Img
                  variant="top"
                  className="cardimg rounded-5"
                  src={item.img}
                  width="100%"
                  alt="Blog Header"
                />
                <Card.Body className="bg-white">
                  <Card.Text
                    className="datecls  mt-4 rounded-circle position-absolute px-3 py-1 top-0 "
                    style={{ background: "white" }}
                  >
                    <span className="date-day">{item.date.slice(0, 2)}</span>
                    <br />
                    <span className="date-month">{item.date.slice(3,6)}</span>
                  </Card.Text>

                  <div className="rounded-4 px-2 px-lg-2  px-xl-5 overlay-container mb-5  mb-lg-2 pb-lg-2">
                    <div
                      className="rounded-4  p-3 bg-white  "
                      style={{
                        boxShadow:
                          " 0px 20px 35px 0px rgba(167, 167, 167, 0.25)",
                      }}
                    >
                      <Card.Text>
                        <FaUserAlt style={{ color: "#7EB693" }} />
                        &nbsp;
                        <span className="cname">{item.cname}</span>
                      </Card.Text>
                      <Card.Text
                        className="c-1 fw-bold "
                        style={{ fontSize: "15px" }}
                      >
                        {item.caption1.slice(0,50)}
                      </Card.Text>
                      <Card.Text className="c-2"><p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.caption2.slice(0,72)) }} /></Card.Text>
                      <Card.Text
                        className="pb-4 readmore fw-bold"
                        onClick={()=>{handlclick(item)}}
                      >
                        Read More &nbsp;
                        <FaArrowRight
                          className="rounded-circle  text-white p-1"
                          style={{ backgroundColor: "#8F3300", color: "white" }}
                        />
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Blogpage;
