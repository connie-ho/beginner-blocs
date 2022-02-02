import React from 'react';
import { makeStyles } from '@mui/styles';
import ProfileCarousel from './ProfileCarousel';

const useStyles = makeStyles((theme)=> ({
  banner: {
    backgroundColor:'rgba(5,24,52,0.3)',
    height: '60rem',
    margin: '2rem',
    position:'relative',
    alignItems: 'center',
    display: 'flex',
    borderRadius:'5rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: theme.typography.pxToRem(250),
    marginBottom: theme.spacing(4),
    position: 'absolute',
    bottom: 0,
    borderColor:'white',
    transform:'translate(0rem,7rem)',
    zIndex: 2,
    borderRadius: theme.typography.pxToRem(300),
  }
}))

const ProfileBanner = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.banner} name='banner'>
      <ProfileCarousel/>
    <img 
        className={classes.img}
        src={require('../../assets/default.png')}
        alt="default"
        name='avatar'
    />
    </div>
  );
};

export default ProfileBanner;
