import React, { useMemo } from 'react';

// @visx imports
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import letterFrequency, {
  LetterFrequency,
} from '@visx/mock-data/lib/mocks/letterFrequency';
import { RadialGradient } from '@visx/gradient';

// local vars
const data = letterFrequency.slice(0); // include all a-z letters
const verticalMargin = 20;
console.log(`here's the mock data: ${JSON.stringify(data)}`);

// accessor functions (with TS types for d3 accessor var d)
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

// TS type definition
export type BarProps = {
  width: number;
  height: number;
  events?: boolean; // optional (via ?)
};

function LetterBars({ width, height, events = true }: BarProps) {
  // define bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // define d3 scales, useMemo for performance (cache)
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax]
  );

  // return TSX of an <svg> filled with a barChart
  return width < 10 ? null : (
    <svg width={width} height={height}>
      {/* <GradientTealBlue id="teal" /> */}
      <RadialGradient id="blueStar" from="#55bdd5" to="#4f3681" r="80%" />
      <rect width={width} height={height} fill="url(#blueStar)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(getLetterFrequency(d));
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events)
                  alert(`you clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}

export default LetterBars;
