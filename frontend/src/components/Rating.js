import React from "react";
import { Star, StarBorder, StarHalf } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
const Rating = ({ value, text }) => {
  const starArray = Array.from({ length: 5 }, (_, index) => {
    if (value >= index + 1) {
      return <Star />;
    }
    if (value >= index + 0.5) {
      return <StarHalf />;
    }
    return <StarBorder />;
  });
  return (
    <Wrapper>
      <div className="star-section">
        {starArray.map((el, index) => {
          return (
            <span className="star-icon" key={index}>
              {el}
            </span>
          );
        })}
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="product-rate-num"
        >
          ({text})
        </Typography>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--amber-600);
  .star-section {
    display: flex;
    gap: 0.15rem;
    align-items: center;
  }
`;

export default Rating;
