import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { callAPI } from 'utils';


const useStyles = makeStyles(theme => ({
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  vehicleCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  vehiclePicker: {
    paddingTop: theme.spacing(4),
  },
}));

const VehiclePicker = ({ duration, handleChange, handleSubmit, originPlaceId, selectedStartDate }) => {

  const s = useStyles();

  const [vehicles, setVehicles] = useState([]);
  const [isRequestingVehicles, setIsRequestingVehicles] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsRequestingVehicles(true);
      setVehicles([]);
      const result = await callAPI('POST', 'https://www.mydriver.com/api/v3/offers', {
        originPlaceId,
        selectedStartDate,
        duration,
        type: 'DURATION'
      });
      if (!result.errorConstant) {
        setVehicles(result);
      }
      setIsRequestingVehicles(false);
    };
    fetchData();
  }, [originPlaceId, selectedStartDate, duration]); // eslint-disable-line

  return (
    <Container align="center" className={s.vehiclePicker} maxWidth={false}>
      {isRequestingVehicles ?
        <CircularProgress /> :
        <Grid container spacing={4}>
          {vehicles.map(vehicle =>
            <Grid item key={get(vehicle, 'vehicleType.id')} xs={12} sm={6} md={4}>
              <Card className={s.vehicleCard}>
                <CardMedia
                  className={s.cardMedia}
                  image={get(vehicle, 'vehicleType.images.web')}
                  title={get(vehicle, 'vehicleType.title')}
                />
                <CardContent className={s.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {get(vehicle, 'vehicleType.title')}
                  </Typography>
                  <Typography>
                    ({get(vehicle, 'vehicleType.exampleCar')})
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {`Price: ${get(vehicle, 'amount') / 100} ${get(vehicle, 'currency')}`}
                  </Typography>
                </CardContent>
                <Button
                  onClick={() => {
                    handleChange('vehicle', vehicle);
                    handleSubmit();
                  }}
                >
                  SELECT
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>
      }
    </Container>
  );
};

VehiclePicker.propTypes = {
  duration: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  originPlaceId: PropTypes.string.isRequired,
  selectedStartDate: PropTypes.string.isRequired,
};

export default VehiclePicker;