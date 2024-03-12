import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function TimePickerViewRendererse() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '4px', borderRadius: '8px', fontSize: '2px', width: 'fit-content' }}>
          {/* Custom background color, rounded borders, smaller font size, and size */}
          <TimePicker
            label="End Time"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
