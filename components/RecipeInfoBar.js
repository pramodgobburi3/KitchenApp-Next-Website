import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { BsClockHistory } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { SiCodechef } from 'react-icons/si';
import { RiUserLocationLine } from 'react-icons/ri';

const RecipeInfoBar = ({time, serving, difficulty, source}) => {

  const getServing = (serving) => {
    if (serving > 1) {
      return serving + " servings";
    } else {
      return serving + " serving";
    }
  }

  const validateURL = (str) => { 
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const generateValidUrl = (url) => {
    var httpString = "http://";
    var httpsString = "https://";
    if (url.substr(0, httpString.length).toLowerCase() !== httpString && url.substr(0, httpsString.length).toLowerCase() !== httpsString)
                url = httpString + url;
    return url;
  }

  const getDifficulty = (difficulty) => {
    switch (difficulty) {
      case '1':
        return 'Beginner'
      case '2':
        return 'Easy'
      case '3':
        return 'Intermediate'
      case '4':
        return 'Advanced'
      default:
        return '-'
    }
  }
  return (
    <div>
      <div className={css(styles.infoContainer)}>
        {time != null && (
          <div className={css(styles.object)}>
            <span style={{color: '#4c4c4c'}}>
              <BsClockHistory size={25} style={{marginRight: 10}}/>  {time}
            </span>
          </div>
        )}
        {serving != null && (
          <div className={css(styles.object)}>
            <span style={{color: '#4c4c4c'}}>
              <MdPeopleOutline size={25} style={{marginRight: 10}}/> {getServing(serving)}
            </span>
          </div>
        )}
        {difficulty != null && (
          <div className={css(styles.noBorderObject)}>
            <span style={{color: '#4c4c4c'}}>
              <SiCodechef size={25} style={{marginRight: 10}}/> {getDifficulty(difficulty)}
            </span>
          </div>
        )}
      </div>
      {source != null && (
        <div className={css(styles.sourceContainer)}>
            {validateURL(source) ? (
              <span style={{color: '#4c4c4c'}}>
                <RiUserLocationLine size={20} style={{marginRight: 10}}/>  
                <a style={{color: '#F43445'}} href={generateValidUrl(source)} target="_blank" rel="noreferrer">{source}</a>
              </span>
            ): (
              <span style={{color: '#4c4c4c'}}>
                <RiUserLocationLine size={20} style={{marginRight: 10}}/> {source}
              </span>
            )}
        </div>
      )}
    </div>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #dddddd',
    borderBottom: '1px solid #dddddd'
  },
  object: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRight: '1px solid #dddddd',
  },
  noBorderObject: {
    flex: 1,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceContainer: {
    borderBottom: '1px solid #dddddd',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RecipeInfoBar;