import React from 'react';
import styled from 'styled-components';

const NavPos = styled.div`
position: absolute;
top: 0px;
height: 50px;
max-width: 820px;
`;

const NavNeg = styled.div`
position: absolute;
bottom: 0px;
height: 50px;
max-width: 820px;
`;

// waveform is created from positive and negative peaks
// height of each div is based on peak
// width of each div is based on total length of waveform (820) divided by the total number of peaks a song has

const WavePos = styled.div`
vertical-align: bottom;
display: inline-block;
box-sizing: border-box;
width: ${({ posPeaks }) => `${820 / posPeaks.length}px`};
height: ${({ peakIndex, posPeaks }) => `${posPeaks[peakIndex]}px`};
border: .1px solid #746153c9;
`;

const WaveNeg = styled.div`
vertical-align: top;
display: inline-block;
box-sizing: border-box;
width:  ${({ negPeaks }) => `${820 / negPeaks.length}px`};
height: ${({ peakIndex, negPeaks }) => `${negPeaks[peakIndex]}px`};
border: .1px solid #746153c9;
`;

const Waveform = ({ posPeaks, negPeaks }) => {
  return (
    <div>
      <NavPos className="navpos">
        {posPeaks.map((posPeak, peakIndex) => (
          <WavePos className="progressPos" key={peakIndex} posPeaks={posPeaks} peakIndex={peakIndex} />
        ))}
      </NavPos>
      <NavNeg>
        {negPeaks.map((negPeak, peakIndex) => (
          <WaveNeg className="progressNeg" key={peakIndex} negPeaks={negPeaks} peakIndex={peakIndex} />
        ))}
      </NavNeg>
    </div>
  );
};

export default Waveform;
