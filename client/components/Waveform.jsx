import React from 'react';
import styled from 'styled-components';

const Waveform = ({ posPeaks, negPeaks }) => {
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
  const WavePos = styled.div`
  vertical-align: bottom;
  display: inline-block;
  box-sizing: border-box;
  width: ${820 / posPeaks.length}px;
  height: ${({ peakIndex }) => `${posPeaks[peakIndex]}px`};
  border: .08px solid #999999ba;
  `;
  const WaveNeg = styled.div`
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
  width:  ${820 / negPeaks.length}px;
  height: ${({ peakIndex }) => `${negPeaks[peakIndex]}px`};
  border: .1px solid #999999ba;
  `;
  return (
    <div>
      <NavPos>
        {posPeaks.map((posPeak, peakIndex) => {
          return (
            <WavePos key={peakIndex} peakIndex={peakIndex} />
          );
        })}
      </NavPos>
      <NavNeg>
        {negPeaks.map((negPeak, peakIndex) => {
          return (
            <WaveNeg key={peakIndex} peakIndex={peakIndex} />
          );
        })}
      </NavNeg>
    </div>
  );
};

export default Waveform;
