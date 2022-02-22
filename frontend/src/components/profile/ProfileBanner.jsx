import React from 'react';
import { makeStyles } from '@mui/styles';
import ProfileCarousel from './ProfileCarousel';

import img from '../../assets/default.png';

const useStyles = makeStyles((theme)=> ({
  banner: {
    backgroundColor:'rgba(5,24,52,0.1)',
    height: '25rem',
    width: '100%',
    margin: '2rem',
    position:'relative',
    alignItems: 'center',
    display: 'flex',
    borderRadius:'5rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: theme.typography.pxToRem(150),
    marginBottom: theme.spacing(4),
    position: 'absolute',
    bottom: 0,
    borderColor:'white',
    transform:'translate(0rem,7rem)',
    zIndex: 2,
    borderRadius: theme.typography.pxToRem(150),
  }
}))

const ProfileBanner = (props) => {
  const {nfts} = props
  const classes = useStyles();

  return (
    <div className={classes.banner} name='banner'>
      <ProfileCarousel nfts={nfts}/>
    <img 
        className={classes.img}
        src={img}
        alt="default"
        name='avatar'
    />
    </div>
  );
};

export default ProfileBanner;
