import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Brandspage.css";
const BrandDetails = () => {
 const selectedBrand = useSelector((state) => state.brands.selectedBrand);
 const brandsData = useSelector((state) => state.brands.brandsData);
 const navigate = useNavigate();

 // Find the selected brand in the brandsData array
 const brand = brandsData.find((brand) => brand.Brand_id === selectedBrand);

 if (!brand) {
   return <div>Loading...</div>; // Add a loading state or error handling as needed
 }

 const handleBrandClick2 = (subcat) => {
   if (subcat.hasSubcat) {
     // You don't need to declare 'setSelectedBrand' here, it's not used in this component.
     // Do whatever logic is required here.
   } else {
     // Navigate to the BrandProductsPage with the selected Subcat_id as a query parameter
     navigate(`/subbrand-products?Subcat_id=${subcat.Subcat_id}`);
      window.scrollTo(0, 0);
   }
 };

  return (
    <div className="container">
      {brand.hasSubcat && (
        <div>
          <h2 className="text-center">Sub-Brands:</h2>
          <Row className="pt-3 pb-3  justify-content-center">
            {brand.subcategories.map((subcat) => (
              <>
                <Col lg={4}>
                  {" "}
                  <Card
                    className="pt-4 pb-4 subbrandcard"
                    onClick={() => handleBrandClick2(subcat)}
                    style={{ border: "1px solid #a52a2a" }}
                  >
                    <Card.Body>
                      {" "}
                      <Card.Title
                        className="text-center"
                        key={subcat.Subcat_id}
                      >
                        {subcat.Subcat_Name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default BrandDetails;
