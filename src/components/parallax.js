import React from "react"
import handleViewport from 'react-in-viewport';
import './parallax.scss'

const Block = ({ inViewport, forwardedRef, photo, inViewClass='in-view' }) => {
  return (
    <div
      ref={forwardedRef}
      className={`parallax ${inViewport ? inViewClass : ''}`}
      style={{
        backgroundImage: `url(${photo.file.url})`
      }}
    />
  );
};

const ViewportBlock = handleViewport(Block, /** options: {}, config: {} **/);
 
export default ({ photo, inViewClass }) => {
  return (
    <ViewportBlock
      photo={photo}
      inViewClass={inViewClass}
      // onEnterViewport={() => console.log('enter')}
      // onLeaveViewport={() => console.log('leave')}
    />
  )
}
