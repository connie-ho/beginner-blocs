import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme)=> ({
  loader: {
    height: '45rem',
    margin: '2rem',
    position:'relative',
    alignItems: 'center',
    display: 'flex',
    borderRadius:'5rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
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

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <img 
          className={classes.img}
          src={require('../../assets/spinner.gif')}
          alt="default"
          name='avatar'
      />
    </div>
  )
}

export default Loading