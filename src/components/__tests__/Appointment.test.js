import React from 'react';

import { render } from '@testing-library/react';

import Appointment from 'components/Appointment';

describe('Appoinment', () => {
    it('renders without crashing', () => {
        render(<Appointment time='5pm' />);
    });
});