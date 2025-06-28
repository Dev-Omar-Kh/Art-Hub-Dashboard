import React from 'react';

// ====== import-images ====== //

import blueSarIcon from '../../assets/svgs/Saudi-Riyal-Symbol-blue.svg';
import greenSarIcon from '../../assets/svgs/Saudi-Riyal-Symbol-Green.svg';

export default function CurrencyImage({width, color = 'blue'}) {

    return <React.Fragment>

        <img 
            className={`${width} pointer-events-none`} 
            src={color === 'blue' ? blueSarIcon : greenSarIcon} 
            alt={`Saudi Riyal Symbol ${color}`} 
        />

    </React.Fragment>

}
