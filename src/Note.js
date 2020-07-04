import React, { useState, useEffect, useLayoutEffect, useRef}from 'react';
import Markdown from 'react-markdown'
  

function Note({data, rest, offset}) {
    const noteRef = useRef(null);
    let scrollX = window.scrollX + offset * 500;
    if (noteRef.current) {
        scrollX = noteRef.current.offsetLeft - window.scrollX;
    }

    return (
        <div 
            ref={noteRef}
            className="Note"
            style={{
                zIndex: scrollX < -500 + offset * 40 + 40 ? 100 - offset: offset + 1,
                boxShadow: scrollX < 500 && scrollX > offset * 40 ? 'rgba(108, 108, 108, 0.41) 1px 2px 10px 3px' : 'none'
            }}
        >   
            <div className='content' style={{
                position: scrollX < offset * 40 && scrollX > - 500? 'fixed': 'relative',
                opacity: scrollX < (-500 + 100 ) + offset * 40 ? '0': '1',
                left: scrollX < offset * 40 && scrollX > - 500? offset * 40: 0,
                maxWidth: scrollX < -500 ? 0 : '420px',
                display: scrollX < -500 + offset * 40 + 40 ? 'none' : 'block',

            }}>
                <Markdown source={data}></Markdown>
            </div>
            <div className='bar' style={{
                opacity: scrollX < (-500 + 80 ) + offset * 40 ? '1': '0',
                display: scrollX < (-500 + 80 ) + offset * 40 ? 'block': 'none',
                left: offset * 40,
            }}>
                { (data.split('\n')[0] || '').replace(/[^\w\s-]*/, "").slice(0, 256)}
            </div>
        </div>
    );
}

export default Note;
