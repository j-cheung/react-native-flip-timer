/* eslint-disable no-param-reassign, radix */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import NumberCard from './number-card';

import style from '../style';

function FlipNumber({
  number, unit, size, perspective, numberWrapperStyle, cardStyle, flipCardStyle, numberStyle, direction = 'up', noHoursLimit,
}) {
  number = parseInt(number);
  let previousNumber = direction == 'down' ? number + 1 : number - 1;
  if (direction == 'down') {
    if (unit !== 'hours') {
      previousNumber = previousNumber === 61 ? 0 : previousNumber;
    } else if (!noHoursLimit) {
      previousNumber = previousNumber === 24 ? 0 : previousNumber;
    }
  } else if (unit !== 'hours') {
    previousNumber = previousNumber === -1 ? 59 : previousNumber;
  } else {
    previousNumber = previousNumber === -1 ? 23 : previousNumber;
  }
  number = number < 10 ? `0${number}` : number;
  previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

  const numberSplit = number.toString().split('');
  const previousNumberSplit = previousNumber.toString().split('');

  return (
    <View style={style.wrapper}>
      <NumberCard
        number={numberSplit[0]}
        previousNumber={previousNumberSplit[0]}
        size={size}
        perspective={perspective}
        numberWrapperStyle={numberWrapperStyle}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
      <NumberCard
        number={numberSplit[1]}
        previousNumber={previousNumberSplit[1]}
        size={size}
        perspective={perspective}
        numberWrapperStyle={numberWrapperStyle}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
    </View>
  );
}

FlipNumber.defaultProps = {
  unit: 'seconds',
};

FlipNumber.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  unit: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
  size: PropTypes.number,
  perspective: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default FlipNumber;
