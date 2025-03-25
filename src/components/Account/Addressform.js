
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Col, Form, Row,Modal } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import UserDetails from "./UserDetails";

const Addressform = ({ baseUrl1 }) => {
  const navigate=useNavigate()
  // Define state to manage form data

  const userId = Cookies.get("userId"); // Retrieve userId from cookies

  //posting data in form
  const [formData, setFormData] = useState({
    UserID: userId,
    Name: "",
    StreetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
    Contry: "",
    gst: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object and append the form fields
    const formdata = new FormData();
    formdata.append("UserID", formData.UserID);
    formdata.append("Name", formData.Name);
    formdata.append("StreetAddress", formData.StreetAddress);
    formdata.append("City", formData.City);
    formdata.append("State", formData.State);
    formdata.append("ZipCode", formData.ZipCode);
    formdata.append("Contry", formData.Contry);
    formdata.append("gst",formData.gst);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }; 

    try {
      const response = await fetch(
        baseUrl1 + "Add_addresess.php",
        requestOptions
      );

      if (response.ok) {
        // Clear the input fields by resetting formData to its initial state
        setFormData({
          UserID: userId,
          Name: "",
          StreetAddress: "",
          City: "",
          State: "",
          ZipCode: "",
          Contry: "",
          gst: "",
        });

        closeModal();
        navigate('/account/accountDetails');

      } else {
        // Form submission failed, display an error message to the user
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert("Form submission failed. Please try again later.");
    }
  };

  // Handle input field changes and update form data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className="text-start mx-lg-5 mx-1 px-lg-5 address-details">
      <h3 className="mx-4 mx-md-3">Saved Address</h3>

      <UserDetails baseUrl1={baseUrl1} />
      <button className="mx-4 mx-md-4 btna rounded-3 p-2" onClick={openModal}>
        Add New+
      </button>

      <Modal show={showModal} onHide={closeModal} className="p-0">
        <Modal.Body>
          <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
          <div className=" text-center">
            <Row className="text-start">
              <Form className="mt-5 px-lg-5" onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6"
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel"> Name*</Form.Label>
                        <Form.Control
                          onChange={handleInputChange}
                          name="Name"
                          value={formData.Name}
                          className="labelholder"
                          required
                          type="text"
                          placeholder=" Name"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6"
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel">
                          StreetAddress*
                        </Form.Label>
                        <Form.Control
                          onChange={handleInputChange}
                          value={formData.StreetAddress}
                          name="StreetAddress"
                          className="labelholder"
                          required
                          type="text"
                          placeholder="Enter StreetAddress"
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6"
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel">City*</Form.Label>
                        <Form.Control
                          onChange={handleInputChange}
                          name="City"
                          value={formData.City}
                          className="labelholder"
                          required
                          type="text"
                          placeholder="Your City here"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6"
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel">State*</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={handleInputChange}
                          value={formData.State}
                          name="State"
                          className="labelholder form-select"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="">Select State</option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6" 
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel">ZipCode*</Form.Label>
                        <Form.Control
                          onChange={handleInputChange}
                          name="ZipCode"
                          value={formData.ZipCode}
                          className="labelholder"
                          required
                          type="number"
                          placeholder="ZipCode"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6"
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel">Country*</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={handleInputChange}
                          name="Contry"
                          value={formData.Contry}
                          className="labelholder form-select"
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Brazil">Brazil</option>
                          <option value="Brunei">Brunei</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cabo Verde">Cabo Verde</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Central African Republic">Central African Republic</option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">Dominican Republic</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">Equatorial Guinea</option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Eswatini">Eswatini</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Greece">Greece</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-Bissau">Guinea-Bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran">Iran</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Kosovo">Kosovo</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Laos">Laos</option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libya">Libya</option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">Marshall Islands</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia">Micronesia</option>
                          <option value="Moldova">Moldova</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="North Korea">North Korea</option>
                          <option value="North Macedonia">North Macedonia</option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestine">Palestine</option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">Papua New Guinea</option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Romania">Romania</option>
                          <option value="Russia">Russia</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">Solomon Islands</option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Korea">South Korea</option>
                          <option value="South Sudan">South Sudan</option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syria">Syria</option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-Leste">Timor-Leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Vatican City">Vatican City</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </Form.Control>
                      </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group
                        className="mb-3"
                        as={Col}
                        md="6"
                        lg="6"
                        xs="12"
                      >
                        <Form.Label className="formlabel">GST</Form.Label>
                        <Form.Control
                          onChange={handleInputChange}
                          name="gst"
                          value={formData.gst}
                          className="labelholder"
                          type="text"
                          placeholder=" GST"
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>
                <button
                  type="submit"
                  // onClick={handleShow2}
                  className="rounded-4 btna p-3 mt-4 mb-4 "
                >
                  Save Changes
                </button>
              </Form>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Addressform;
