import React from 'react';
import { ScrollSpy } from 'organism-react-scroll-nav';
import {
  Banner,
  Feature,
  Showcase,
  Testimonials,
  Technology,
  Pricing,
  Contact
} from 'dan-components';

function HomePage() {
  return (
    <div>
      <section id="banner">
        <Banner />
      </section>
      <ScrollSpy id="feature">
        <Feature />
      </ScrollSpy>
      {/* <ScrollSpy id="showcase">
        <Showcase />
<<<<<<< HEAD
      </ScrollSpy>
       {/* <ScrollSpy id="testimonials">
=======
      </ScrollSpy> */}
      <ScrollSpy id="testimonials">
{/* >>>>>>> 6d133c5008b14b0fb067ea87aa9aa189c29db3b8 */}
        <Testimonials />
      </ScrollSpy>
      {/* <ScrollSpy id="technology">
        <Technology />
      </ScrollSpy> */}
      <ScrollSpy id="pricing">
        <Pricing /> 
      </ScrollSpy> 
      <ScrollSpy id="contact">
        <Contact />
      </ScrollSpy>
    </div>
  );
}

export default HomePage;
