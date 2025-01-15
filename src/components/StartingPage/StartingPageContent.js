import Introduction from './Introduction';
import Testimonials from './Testimonials';
import OurService from './OurService'
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={classes['starting-page']}>
      <Introduction />
      <OurService />
      <Testimonials />
    </section>
  );
};

export default StartingPageContent;
