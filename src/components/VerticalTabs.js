import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../styles/VerticalTabs.css";

const tabs = [
  {
    key: "craft",
    label: "Promote Craftmanship",
    icon: <i className="bi bi-gem"></i>,
    image: require('../assets/craftmanship.jpg'),
    content: (
      <>
        <h2 className="Change_heading">Preserving heritage through every stitch.</h2>
        <p>We are proud to support India's master artisans—those who have preserved intricate weaving, hand embroidery, zari, and karigari for generations.</p>
        <div className="mt-3 mb-2" style={{display: 'flex', alignItems: 'center'}}>
          <span className="fw-bold" style={{fontSize: '1.5rem'}}>Our Actions:</span>
        </div>
        <ul>
          <li>Curating bridal and festive wear that showcases regional craftsmanship.</li>
          <li>Offering consistent livelihood opportunities to skilled rural artisans.</li>
        </ul>
        <blockquote className="fst-italic mt-3" style={{fontSize: '1rem', color: '#d70077'}}>
          "Each outfit is not just a product, but a living canvas of cultural legacy."
        </blockquote>
      </>
    ),
  },
  {
    key: "environment",
    label: "Impact on Environment",
    icon: <i className="bi bi-globe2"></i>,
    image: require('../assets/environment.jpg'),
    content: (
      <>
        <h2 className="Change_heading">Eco-conscious practices for a cleaner tomorrow.</h2>
        <p>At HS India, we acknowledge our responsibility to reduce environmental impact throughout the production chain. Our focus is on efficiency, sustainability, and thoughtful resource use.</p>
        <div className="mt-3 mb-2" style={{display: 'flex', alignItems: 'center'}}>
          <span className="fw-bold" style={{fontSize: '1.5rem'}}>Our Actions:</span>
        </div>
        <ul>
          <li>Streamlining packaging with biodegradable and recyclable materials.</li>
          <li>Introducing digital catalogs to reduce paper consumption.</li>
        </ul>
        <blockquote className="fst-italic mt-3" style={{fontSize: '1rem', color: '#d70077'}}>
          "We don't just make fashion. We make it sustainable."
        </blockquote>
      </>
    ),
  },
  {
    key: "shreeka",
    label: "Impact on Human Lives",
    icon: <i className="bi bi-people"></i>,
    image: require('../assets/human.jpg'),
    content: (
      <>
      <h2 className="Change_heading">Putting people at the heart of what we do.</h2>
        <p>We are committed to ensuring that every individual in our supply chain—from tailors to logistic partners—feels valued, safe, and respected.</p>
        <div className="mt-3 mb-2" style={{display: 'flex', alignItems: 'center'}}>
          <span className="fw-bold" style={{fontSize: '1.5rem'}}>Our Actions:</span>
        </div>
        <ul>
          <li>Safe and ethical working conditions in all facilities.</li>
          <li>Regular training and upskilling for women and youth in local communities.</li>
        </ul>
        <blockquote className="fst-italic mt-3" style={{fontSize: '1rem', color: '#d70077'}}>
          "When fashion uplifts lives, it becomes more than business—it becomes change."
        </blockquote>
      </>
    ),
  },
  {
    key: "trends",
    label: "Recognizing Trends",
    icon: <i className="bi bi-bar-chart-line"></i>,
    image: require('../assets/trends.jpg'),
    content: (
      <>
        <h2 className="Change_heading">Leading fashion with responsibility and relevance.</h2>
        <p>We believe innovation and tradition can coexist. Our design teams continuously research evolving consumer preferences while staying true to our cultural roots.</p>
        <div className="mt-3 mb-2" style={{display: 'flex', alignItems: 'center'}}>
          <span className="fw-bold" style={{fontSize: '1.5rem'}}>Our Actions:</span>
        </div>
        <ul>
          <li>Real-time trend analysis integrated with sustainable design practices.</li>
          <li>Collaborating with stylists and influencers to amplify mindful fashion.</li>
        </ul>
        <blockquote className="fst-italic mt-3" style={{fontSize: '1rem', color: '#d70077'}}>
          "Trends may come and go—but values stay timeless."
        </blockquote>
      </>
    ),
  },
];

const VerticalTabs = () => {
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  const currentTab = tabs.find((tab) => tab.key === activeKey);

  return (
    <Container className="my-5">
        <div className="col-12">
          <h1 className="custom-heading">Threads of Change – Our Commitment Beyond Fashion</h1>
          <hr className="custom-divider" />
          </div>
      <Row>
        {/* Sidebar Tabs */}
        <Col md={3} className="mb-3 mb-md-0">
          <Nav
            variant="pills"
            className="flex-column"
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link
                  eventKey={tab.key}
                  className="text-start py-3 px-4 rounded shadow-sm mb-2 custom-tab"
                >
                  <span className="me-2">{tab.icon}</span>
                  {tab.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Content */}
        <Col md={9}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-4 border rounded shadow-sm bg-light"
            >
              <Row className="align-items-center">
                <Col className="col-md-6 col-12">
                  <div className="mt-2">{currentTab.content}</div>
                </Col>
                <Col className="mb-3 mb-md-0 text-center col-md-6 col-12">
                  <img src={currentTab.image} alt={currentTab.label} className="img-fluid rounded" />
                </Col>
              </Row>
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
};

export default VerticalTabs;