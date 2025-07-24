import React from 'react';
import './Media.css';
import SEO from './SEO';
import MediaImage from '../assets/album/album_nine.jpg';

const Media = () => (
  <>
    <SEO title="Media - HS India" description="Explore the latest news, events, and media coverage of HS India, a leader in ethnic fashion." />
    <section className="Padding-Top">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="custom-heading">Making Headlines, Turning Heads</h1>
            <hr className="custom-divider" />
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <p className="media-lead mb-4">At HS India, our journey extends far beyond fashion racks and retail shelves — it lives on runways, thrives at global exhibitions, and is celebrated in press features across the industry. Every collection we create, every event we attend, and every showcase we participate in is a reflection of our dedication to redefining ethnic fashion with elegance, innovation, and scale. Whether it’s captivating audiences at international trade shows, being spotlighted in leading fashion magazines, or collaborating with trendsetters and influencers, HS India continues to make its mark—loud, proud, and style-forward. We don’t just follow fashion — we shape it, represent it, and make headlines doing it.</p>
          </div>
          <div className="col-lg-6 text-center">
            <img src={ MediaImage } alt="Media" className="img-fluid rounded-4 shadow" />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Media; 