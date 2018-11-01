import React from 'react';

const opacity = (selectedStar, currentStar) => {
  if (selectedStar === null || selectedStar === currentStar) {
    return 1;
  }
  return 0.25;
};

const userPic = (userProp) => {
  if (userProp.includes('https')) {
    return <img className='reviewUserPic'src={userProp}></img>;
  }
  return <div className='reviewUserInitials'>{userProp}</div>;
};

const reviewText = (review) => {
  if (typeof review === 'object') {
    return (
      <div>
        {review.preQuery}
        {review.query}
        {review.postQuery}
      </div>
    );
  }
  return (
    <div>
      {review}
    </div>
  );
};

export default { opacity, userPic, reviewText };
