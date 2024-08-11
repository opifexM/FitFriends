import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { useEffect, useRef, useState } from 'react';
import './range-slider.css';

interface RangeSliderProps {
  min: number;
  max: number;
  start: [number, number];
  step?: number;
  showValue?: boolean;
  onChange: (values: [number, number]) => void;
}

export function RangeSlider({
  min,
  max,
  start,
  step = 1,
  showValue = false,
  onChange,
}: Readonly<RangeSliderProps>) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [values] = useState<[number, number]>(start);

  useEffect(() => {
    if (sliderRef.current) {
      noUiSlider.create(sliderRef.current, {
        start: start,
        connect: true,
        range: {
          min: min,
          max: max,
        },
        step: step,
        format: {
          to: (value) => Number(value).toFixed(0),
          from: (value) => Number(value),
        },
      });

      (sliderRef.current as target).noUiSlider?.on('update', (values) => {
        const [value1, value2] = values.map(Number);
        onChange([value1, value2]);
      });
    }

    return () => {
      if (sliderRef.current) {
        (sliderRef.current as target).noUiSlider?.destroy();
      }
    };
  }, [min, max, start, step, onChange]);

  return (
    <div>
      <div ref={sliderRef} className="filter-range__scale" />
      {showValue && (
        <div className="slider-values slider-div">
          <span className="slider-value">{values[0]}</span>
          <span className="slider-value">{values[1]}</span>
        </div>
      )}
    </div>
  );
}
