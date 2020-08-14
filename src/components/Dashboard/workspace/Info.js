import React from 'react';
import { useSelector } from 'react-redux';
import { camelToSentenceCase } from './util/string';

export default (props) => {

    const info = useSelector((state) => {
        return state.info;
    });

    return <div className="info-pane">
        <span className="topic">{camelToSentenceCase(info.topic)}</span>
        <p>
            {info.description}
        </p>
        
    </div>
}