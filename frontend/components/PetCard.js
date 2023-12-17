import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import "./PetCard.css";
import CalculateAge from "./CalculateAge";
import InformationBox from "./InformationBox";

/* Petcard component renders a card with data of post
 * postID : ID of the post
 * postTitle : title of the post
 * petTypeName : name of type of the pet
 * petBreed : name of breed of th pet
 * petDOB : date of birth of the pet based on timestamp
 * petPic : picture of thepet
 */
const PetCard = ({
  postID,
  postTitle,
  petTypeName,
  petBreed,
  petDOB,
  petPic,
}) => {
  // calculate the age of the pet from the date of birth
  const petAge = CalculateAge(petDOB);

  return (
    <Card className="card" bsPrefix="custom">
      {/* render pet image */}
      <Card.Img className="image" src={petPic} />
      <Card.Body bsPrefix="custom">
        {/* render post title */}
        <Card.Title className="card-title">{postTitle}</Card.Title>
        {/* render post information include type, breed and age of pet */}
        <Card.Body className="information-container">
          <Row className="information-text">
            <Col className="information-icon" md={2}>
              <img src={require("./image/paw.svg").default} alt="paw-icon" />
            </Col>
            {/* mapping the information and InformationBox component to show information of post */}
            <Col className="information">
              <InformationBox
                attribute="ประเภทสัตว์เลี้ยง"
                value={petTypeName}
              />
              <InformationBox attribute="พันธุ์สัตว์เลี้ยง" value={petBreed} />
              <InformationBox attribute="อายุ" value={petAge} />
            </Col>
          </Row>
          <Row>
            {/* render view button element with navigate to the detail page */}
            <div className="view-button">
              <Link to={`/Adoption`} state={postID}>
                <Button className="button" bsPrefix="custom">
                  ดูรายละเอียดทั้งหมด
                </Button>
              </Link>
            </div>
          </Row>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
