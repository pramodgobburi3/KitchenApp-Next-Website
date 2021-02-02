import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Lottie from 'react-lottie';

import * as animationData from '../assets/lotties/cooking.json';
import UncontrolledLottie from './UncontrolledLottie';

const Loader = ({overlay, hasHeader}) => {
  const styles = StyleSheet.create({
    background: {
      minWidth: '100%',
      minHeight: hasHeader ? 'calc(100vh - 70px)' : '100vh',
      backgroundColor: overlay ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: overlay ? 'fixed' : 'relative',
      zIndex: overlay ? 10000 : 'auto',
      paddingBottom: overlay ? 0 : 200,
      pointerEvents: 'none',
    },
    roundedBg: {
      backgroundColor: 'white',
      padding: 0,
      borderRadius: 400,
    },
    loadingText: {
      alignSelf: 'center',
      textAlign: 'center',
      color: '#F43445',
      fontFamily: 'Sansita Swashed',
      fontSize: 40,
      marginBottom: 0,
    }
  });
  return (
    <div className={css(styles.background)}>
      {
        overlay ? (
          <div>
            <p className={css(styles.loadingText)}>Loading</p>
            <div className={css(styles.roundedBg)}>
              <UncontrolledLottie animationData="cooking" width={250} height={250} autoplay={true} loop={true} />
            </div>
          </div>
        ) : (
          <UncontrolledLottie animationData="cooking" width={250} height={250} autoplay={true} loop={true} />
        )
      }
    </div>
  )
}

export default Loader;