import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { get } from 'lodash';
import * as moment from 'moment';
import React from 'react';

import VehiclePicker from 'components/VehiclePicker';
import FormDateTimePicker from 'ui/FormDateTimePicker';
import FormDropDown from 'ui/FormDropDown';
import { useForm } from 'utils/hooks';


export const locations = [
  {
    placeId: 'ChIJxfxSz4t1nkcRLxq9ze1wwak',
    label: 'The Famous Munich Hofbräuhaus',
    address: 'Hofbräuhaus München, Platzl, Munich, Germany'
  },
  {
    placeId: 'EhtLYXJsc3BsLiwgTcO8bmNoZW4sIEdlcm1hbnkiLiosChQKEgkfRGon93WeRxEvZKuqIIsjnxIUChIJJ8yNql7fnUcRAKU5CaQlHQU',
    label: 'Just in the city center: The Stachus',
    address: 'Stachus, Munich, Germany'
  },
  {
    placeId: 'ChIJU-Q6JoF2nkcRdQApBoHVU8s',
    label: 'The Olympic Tower',
    address: 'Spiridon-Louis-Ring, Munich, Germany'
  },
  {
    placeId: 'ChIJayv4lZd1nkcR0e_vfGLfm8k',
    label: 'The Beautiful English Garden',
    address: 'Englischer Garten, Munich, Germany'
  },
  {
    placeId: 'ChIJHyWKEoVznkcRI8QyjkJgTe0',
    label: 'The Iconic Allianz Arena',
    address: 'Allianz Arena, Werner-Heisenberg-Allee, Munich, Germany'
  },
  {
    placeId: 'ChIJLWiif8x3nkcRZm0epRZWTCc',
    label: 'The Impressive Nymphenburg Castle',
    address: 'Schloss Nymphenburg, Schloß Nymphenburg, Munich, Germany'
  }
];

const validator = (values) => {
  let errors = {};
  if (!values.originPlaceId) {
    errors.originPlaceId = 'Please select location!';
  }
  if (values.selectedStartDate.includes('_') || !moment(values.selectedStartDate, "DD/MM/YYYY HH:mm").isValid()) {
    errors.selectedStartDate = 'Please enter valid date and time';
  } else if (moment(values.selectedStartDate, "DD/MM/YYYY HH:mm").isBefore(moment())) {
    errors.selectedStartDate = 'Please enter date and time in future';
  }
  return errors;
};

const TourPickerForm = () => {

  const initialValues = {
    originPlaceId: '',
    selectedStartDate: moment().add(1, 'day').startOf('hour').format('DD/MM/YYYY HH:mm'),
    duration: 120,
  };
  const form = useForm((data) => console.log('all data entered to form:', data), validator, initialValues);
  const { isValid, values } = form;

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          Please select tour options:
        </Typography>
        <FormDropDown
          label="Location"
          name="originPlaceId"
          options={locations.map(({ placeId, label }) => ({ value: placeId, label }))}
          {...form}
        />
        <FormDateTimePicker
          label="Start Date and Time"
          name="selectedStartDate"
          {...form}
        />
        <FormDropDown
          label="Duration"
          name="duration"
          options={[
            { value: 120, label: '2 hours' },
            { value: 180, label: '3 hours' },
            { value: 240, label: '4 hours' },
            { value: 300, label: '5 hours' },
            { value: 360, label: '6 hours' },
          ]}
          {...form}
        />
      </Container>
      {isValid &&
        <VehiclePicker
          duration={get(values, 'duration')}
          form={form}
          originPlaceId={get(values, 'originPlaceId')}
          selectedStartDate={moment(get(values, 'selectedStartDate'), 'DD/MM/YYYY HH:mm').format()}
          {...form}
        />
      }
    </>
  );
};

export default TourPickerForm;