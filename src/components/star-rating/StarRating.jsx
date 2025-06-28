import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function StarRating({rate}) {

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rate >= i) {
            stars.push(<FaStar key={i} className="text-[var(--yellow-color)]" />);
        } else if (rate >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="text-[var(--yellow-color)]" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-[var(--yellow-color)]" />);
        }
    }

    return <React.Fragment>

        <div className="flex">{stars.reverse()}</div>

    </React.Fragment>

}
