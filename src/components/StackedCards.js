import React from 'react';
import './StackedCards.css';
import wholesale from '../assets/wholesale.jpg'
import retail from '../assets/retail.jpg'
import manufac from '../assets/manufac.jpg'
import export_image from '../assets/album/album_eleven.jpg'

const cards = [
  {
    id: 1,
    title: (
      <span> Wholesale – Fashion That Means Business
      </span>
    ),
    text: (
      <span>
        We empower thousands of resellers and B2B clients with high-margin ethnicwear that sells. Our wholesale brands offer unmatched variety, trending designs, and reliable inventory for every season.<br /><br />
        <strong>Our Wholesale Verticals:</strong>
        <ul style={{ marginTop: '0.5em', marginBottom: 0 }}>
          <li><strong>House of Surya</strong> – India's trusted name for bulk ethnicwear sourcing</li>
          <li><strong>Surya Ethnic Fashion</strong> – Trend-driven collections for the modern marketplace</li>
        </ul>
      </span>
    ),
    image: wholesale,
  },
  {
    id: 2,
    title: (
      <span>Manufacturing – Where Craft Meets Scale</span>
    ),
    text: (
      <span>
        With in-house manufacturing units and expert karigars, HS India ensures every piece meets the highest standards in design, detail, and durability. We own our entire production process — from sketch to stitch.<br /><br />
        <strong>Highlights:</strong>
        <ul style={{ marginTop: '0.5em', marginBottom: 0 }}>
          <li>Bulk capacity for bridal & festive collections</li>
          <li>Custom orders & private label options</li>
          <li>Quality control across every stage</li>
        </ul>
      </span>
    ),
    image: manufac,
  },
  {
    id: 3,
    title: (
      <span>Retail – Where Fashion Meets Every Customer</span>
    ),
    text: (
      <span>
        Our retail brands cater to a wide spectrum of customers—from everyday festive shoppers to premium bridal buyers. Each brand reflects a unique design philosophy with mass and niche appeal.<br /><br />
        <strong>Our Retail Brands:</strong>
        <ul style={{ marginTop: '0.5em', marginBottom: 0 }}>
          <li><strong>Surya Sarees</strong> – Classic elegance for all occasions</li>
          <li><strong>Siyonee</strong> – Fusionwear for today's bold woman</li>
          <li><strong>Raagwaas</strong> – Regal couture for the traditional bride</li>
        </ul>
      </span>
    ),
    image: retail,
  },
  {
    id: 4,
    title: (
      <span>Export – Indian Ethnicwear Across Borders</span>
    ),
    text: (
      <span>
        We proudly represent Indian fashion on the global stage. Our export vertical brings high-quality ethnic garments to international markets, backed by efficient logistics and white-label support.<br /><br />
        <strong>Our Export Arm:</strong>
        <ul style={{ marginTop: '0.5em', marginBottom: 0 }}>
          <li><strong>Kiran Enterprises</strong> – Driving global distribution with Indian soul</li>
        </ul>
      </span>
    ),
    image: export_image,
  },
];

const StackedCards = () => {
  return (
    <div className='container py-5'>
    <div className="stacking-cards-page">
      
      <h1 className="custom-heading">Our Business at a Glance</h1>
      <hr className="custom-divider" />

      <main className="mx-auto stacking-cards-main">
        <ul id="cards">
          {cards.map((card) => (
            <li className="card" key={card.id} id={`card-${card.id}`}>
              <div className="card-content rounded-4">
                <div className='px-3 py-3'>
                  <h2>{card.title}</h2>
                  <div>{card.text}</div>
                </div>
                <figure>
                  <img src={card.image} alt={card.title} />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </main>
      </div>
    </div>
  );
};

export default StackedCards;