// average rating = (5r5 + 4r4 + 3r3 + 2r2 + r1) / (r5 + r4 + r3 + r2 + r1),

function calculateAverageRating(reviews) {
    const responsesByStars = {
        'r1': 0,
        'r2': 0,
        'r3': 0,
        'r4': 0,
        'r5': 0
    }

    reviews.forEach(review => {
        responsesByStars['r' + review]++;
    });

    return (
        5 * responsesByStars.r5 + 
        4 * responsesByStars.r4 + 
        3 * responsesByStars.r3 + 
        2 * responsesByStars.r2 + 
        responsesByStars.r1 ) / ( reviews.length );

}

module.exports = calculateAverageRating;
