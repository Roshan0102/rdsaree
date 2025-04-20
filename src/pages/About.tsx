import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-center mb-12">About RD Saree Collections</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-4">Our Story</h2>
          <p className="text-lg mb-4">
            RD Saree Collections is a premium destination for authentic Indian sarees, 
            bringing together traditional craftsmanship and contemporary designs. 
            Founded with a passion for preserving India's rich textile heritage, 
            we curate exquisite collections that celebrate the diversity of Indian sarees.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            We are committed to providing our customers with the finest quality sarees 
            while supporting traditional weavers and artisans across India. 
            Each saree in our collection tells a story of craftsmanship, 
            tradition, and timeless elegance.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-4">Our Collections</h2>
          <p className="text-lg mb-4">
            From luxurious silk sarees to comfortable cotton drapes, 
            our collections showcase the best of Indian textiles. 
            We carefully select each piece, ensuring authenticity, 
            quality, and attention to detail.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif mb-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Authentic handcrafted sarees</li>
            <li>Direct sourcing from weavers</li>
            <li>Quality assurance</li>
            <li>Secure packaging and fast delivery</li>
            <li>Excellent customer service</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 