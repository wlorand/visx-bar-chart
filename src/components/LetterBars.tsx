import React, { useMemo } from 'react';

// @visx imports
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { RadialGradient } from '@visx/gradient';

// mock data -- letterFrequency is the data, LetterFrequency is the type
import letterFrequency, {
  LetterFrequency,
} from '@visx/mock-data/lib/mocks/letterFrequency';

// local vars
const data = letterFrequency.slice(0); // include all a-z letters - was slice(5) for demo

const margin = { top: 20, bottom: 0, left: 20, right: 20 };
console.log(`here's the mock data: ${JSON.stringify(data)}`);

// accessor functions (with TS types for d3 accessor var d) -- data-driven!
// they seem out of place here -- perhaps closer to the data fetch ?
const getLetter = (d: LetterFrequency) => d.letter; // return the letter on each iteration
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

// TS type definition
// should i do type or interface ??
type BarProps = {
  width: number;
  height: number;
  events?: boolean; // optional (via ?)
};

// take in width and height as props
function LetterBars({ width, height, events = true }: BarProps) {
  // define bounds - be more d3 explicit with "this is margin convention"
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // define d3 scales, also useMemo for performance (cache)

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
  return (
    <svg width={width} height={height} className="app-chart">
      {/* <GradientTealBlue id="teal" /> */}
      <RadialGradient id="blueStar" from="#55bdd5" to="#4f3681" r="80%" />
      <rect width={width} height={height} fill="url(#blueStar)" rx={14} />
      <Group top={margin.top / 2}>
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
