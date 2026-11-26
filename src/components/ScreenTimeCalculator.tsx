import React, { useState } from 'react';
import { DotsGrid } from './DotsGrid';

/** The dots maths, interactive: hours of screens a day -> days of
    the year. hours x 365 = hours a year; / 24 = full days a year.
    The preset buttons are the poster's own numbers (2h = 30 days,
    4h = 61, 7h = 106, 10h = 152). No other numbers are used. */
const PRESETS = [2, 4, 7, 10];
const MIN_HOURS = 0;
const MAX_HOURS = 12;
const STEP = 0.5;

function formatHours(hours: number): string {
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
}

export const ScreenTimeCalculator: React.FC = () => {
  const [hours, setHours] = useState<number>(4);

  const hoursPerYear = Math.round(hours * 365);
  const daysPerYear = Math.round((hours * 365) / 24);

  return (
    <div className="calculator-card">
      <div className="calculator-controls">
        <label className="calculator-label" htmlFor="screen-hours">
          Hours of screens a day
        </label>
        <div className="calculator-slider-row">
          <input
            id="screen-hours"
            type="range"
            min={MIN_HOURS}
            max={MAX_HOURS}
            step={STEP}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="calculator-slider"
            aria-describedby="calculator-result"
          />
          <span className="calculator-hours" aria-hidden="true">
            {formatHours(hours)}h
          </span>
        </div>
        <div className="calculator-presets" role="group" aria-label="Common amounts">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`calculator-preset${hours === preset ? ' calculator-preset-active' : ''}`}
              onClick={() => setHours(preset)}
              aria-pressed={hours === preset}
            >
              {preset}h a day
            </button>
          ))}
        </div>
      </div>

      <p className="calculator-result" id="calculator-result" aria-live="polite">
        <span className="calculator-days">{daysPerYear}</span>
        <span className="calculator-result-text">
          {daysPerYear === 1 ? 'day' : 'days'} of your year — on a screen.
          That is {hoursPerYear.toLocaleString('en-GB')} hours a year.
        </span>
      </p>

      <div className="calculator-grid-wrap">
        <DotsGrid
          filled={daysPerYear}
          size="lg"
          label={`${daysPerYear} of 365 squares filled — ${daysPerYear} days of the year on a screen`}
        />
        <p className="calculator-legend">Each square = 1 day of your year.</p>
      </div>
    </div>
  );
};
