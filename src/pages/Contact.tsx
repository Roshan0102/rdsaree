import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-center mb-12">Contact Us</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-serif mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p>123 Saree Street,<br />
                Textile Market,<br />
                Mumbai, Maharashtra 400001</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p>+91 98765 43210</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p>info@rdsareecollections.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">Business Hours</h3>
                <p>Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-serif mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Your name" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Your email" className="input input-bordered" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-32" placeholder="Your message"></textarea>
              </div>
              
              <div className="form-control mt-6">
                <button className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 