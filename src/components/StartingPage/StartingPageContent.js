import Introduction from './Introduction';
import TopOffer from './TopOffer'
import Testimonials from './Testimonials';
import OurService from './OurService'
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={classes['starting-page']}>
      <Introduction />
      <TopOffer />
      <OurService />
      <Testimonials />
    </section>
  );
};

export default StartingPageContent;
