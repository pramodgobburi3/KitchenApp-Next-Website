import { StyleSheet, css } from 'aphrodite'
import { Container } from 'reactstrap';
import { HiOutlineSearch } from 'react-icons/hi';
import ProcessCard from '../components/ProcessCard';

// Rehydrate to ensure that the client doesn't duplicate styles
// It has to execute before any code that defines styles
// '__REHYDRATE_IDS' is set in '_document.js'
if (typeof window !== 'undefined') {
  StyleSheet.rehydrate(window.__REHYDRATE_IDS)
}

const HomePage = props => {
  return (
    <div className={css(styles.bgImgContainer)}>
      <Container>
        <div className={css(styles.mainContainer)}>
          <h1 className={css(styles.logo)}>Kitchen App</h1>
          <h2>Making recipes has never been easier!</h2>
          <div className={css(styles.searchContainer)}>
            <span style={{marginRight: 10}}><HiOutlineSearch /></span>
            <form>
              <input type="text" placeholder="Browse our recipes" style={{border: 'none', outline: 'none', width: 300}} />
            </form>
          </div>
        </div>
        <div className={css(styles.processContainer)}>
          <h2>
            Our Mission
          </h2>
          <h5>We strive to make it easy for you to find and try new recipes.</h5>
          <div className={css(styles.processCardContainer)}>
            <ProcessCard heading="Find a recipe" subHeading="Our vast database is guaranteed to contain all of your favorite recipes." />
            <ProcessCard heading="Create a grocery list" subHeading="We generate grocery lists based on your recipe selections." />
            <ProcessCard heading="Shop with convenience" subHeading="Use our integrations to get groceries delivered to your door." />
          </div>
        </div>
      </Container>
    </div>
  )
};

const styles = StyleSheet.create({
  bgImgContainer: {
    width: '100%',
    height: 'calc(100vh - 70px)',
    backgroundImage: 'url("https://images.pexels.com/photos/256318/pexels-photo-256318.jpeg")',
    backgroundSize: 'cover'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingBottom: 70,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    minWidth: 300,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    marginTop: 20,
    ":focus-within": {
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    }
  },
  logo: {
    color: '#F43445',
    fontWeight: 'bold',
    fontFamily: 'Sansita Swashed',
    fontSize: 60,
  },
  processContainer: {
    marginTop: 100,
  },
  processCardContainer: {
    display: 'grid',
    marginTop: 50,
    justifyContent: 'center',
    gridTemplateColumns: 'repeat( auto-fit, minmax(300px, max-content) )',
    gridGap: '3rem',
    marginBottom: 30
  }
})

export default HomePage;