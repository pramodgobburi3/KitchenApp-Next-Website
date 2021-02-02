import React, { Component } from 'react'
import Lottie from 'react-lottie'


const UncontrolledLottie = ({ loop, autoplay, animationData, height, width }) => {
  const options = {
    loop: loop,
    autoplay: autoplay,
    animationData: require('../assets/lotties/' + animationData + '.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  return (
    <div>
      <Lottie options={options}
          height={height}
          width={width}
          isClickToPauseDisabled={true}
        />
    </div>
  )
}

export default UncontrolledLottie;