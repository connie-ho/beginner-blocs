import React from "react";
import { makeStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles((theme)=> ({
  banner: {
    backgroundColor:'rgba(5,24,52,0.1)',
    height: '50rem',
    margin: '2rem',
    position:'relative',
    alignItems: 'center',
    display: 'flex',
    borderRadius:'5rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    marginBottom: '2rem',
    marginTop:'10rem'
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
  },
//   card: {
//     backgroundColor: 'black',
//     color: 'white',
//     justifyContent: 'space-around',
//     fontSize: theme.typography.pxToRem(25),
//   },
}))

const Profile = (props) => {
  const {account} = props
  const classes = useStyles()
  return (
    <>
      <Grid container >
        <Grid item xs={1}/>
        <Grid item xs={10} container direction ="column">
          
          <div class={classes.banner}>

          <img 
                class={classes.img}
                src={require('../assets/default.png')}
                alt="default"
                />
          </div>
          <div class={classes.header}>
            <div>
            </div>
            <h1>{account}</h1>
            <h1>Credits: 0 Eth</h1>
            <h1></h1>
          </div>
          <Divider></Divider>
          <h1>Hello World</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu tortor dui. Suspendisse eu est vestibulum, volutpat augue id, pulvinar dolor. Duis ac aliquet justo. Nulla sodales orci purus, eu vulputate lorem interdum vel. Phasellus mollis vitae diam sed rhoncus. Aliquam erat volutpat. Donec convallis, ante a vestibulum ornare, lorem purus ultricies dui, et tincidunt erat ipsum vel nulla. Vivamus ut arcu vestibulum, aliquam libero in, feugiat metus. Pellentesque euismod eros sed sem faucibus aliquam.

Fusce commodo a nisi vitae finibus. Curabitur tincidunt ac sem vitae condimentum. In id ante sed ipsum pretium semper. Donec elementum lorem non molestie consequat. Pellentesque bibendum, leo ac pharetra viverra, metus erat fringilla dolor, in pulvinar massa ligula sed purus. Donec interdum sem scelerisque, tristique velit vel, sodales turpis. Nunc id quam semper, viverra est non, rhoncus erat. Proin eget ultricies ipsum, eget consequat felis. Integer non velit felis. In porta enim urna, eu placerat nisi tincidunt sit amet. In laoreet efficitur orci sit amet vulputate. Etiam at lacus non neque auctor rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu facilisis tortor. Phasellus auctor ornare nisi non pharetra. Maecenas rhoncus, dui eget auctor vulputate, metus odio iaculis tellus, sit amet sollicitudin metus tellus ut nisi.

Sed accumsan, turpis at finibus pulvinar, est sem vulputate nibh, sed imperdiet mauris purus id metus. Praesent id nibh nunc. Donec urna orci, posuere ut ligula interdum, vehicula dignissim leo. Pellentesque pretium lacus vel odio blandit, et tempus nisi tempor. Sed ac varius sem. Nunc blandit lacinia odio, in dapibus dui finibus ac. Morbi viverra lorem a arcu porttitor ornare.

Fusce at nisl nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin hendrerit scelerisque nulla, at placerat elit eleifend non. Phasellus sodales ante eu efficitur cursus. Suspendisse non venenatis justo. Vestibulum fermentum elementum mattis.

Morbi mollis pharetra pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel vestibulum est. Sed nulla elit, commodo in magna nec, aliquet egestas diam. Curabitur aliquam rhoncus aliquet. In vehicula eget risus sed vehicula. Vivamus porttitor urna quis velit elementum, eu finibus nunc dignissim. Etiam tincidunt id velit pellentesque pellentesque. Nullam a malesuada elit. Cras imperdiet elit leo. Maecenas quis nibh posuere, finibus diam vitae, maximus libero. Ut luctus ut felis sit amet elementum. Curabitur tincidunt sagittis nisi ultrices dictum. Etiam et pellentesque libero. Nunc eget pretium magna, ut facilisis ex.</p>
        </Grid>
        <Grid item xs={1}/>        
      </Grid>
    </>
  );
};

export default Profile;
