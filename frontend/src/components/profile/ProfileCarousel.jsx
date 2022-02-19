import Carousel from 'react-multi-carousel';
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@mui/styles';
import './carousel.css';
import NFTs from '../NFTs';

const useStyles = makeStyles((theme)=> ({
  img: {
    width: theme.typography.pxToRem(350),
    marginBottom: theme.spacing(2),
    borderRadius: theme.typography.pxToRem(4),
  }
}))

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const ProfileCarousel = (props) => {
  let nfts = props.nfts
  let testArray = [1,2,3,4]
  const classes = useStyles();

  const cardTest = testArray.map((item) => {
    return (
          <img
            src={'https://statics.pampling.com/imagenes/disenos/diseno_85351.jpg'}
            alt="nft"
            className={classes.img}
            />
    )
  })

  if (nfts.length == 0) {
    return <></>
  }

  return(
  <Carousel
  containerClass='carousel'
  additionalTransfrom={0}
  showDots={false}
  arrows={true}
  autoPlaySpeed={3000}
  autoPlay={true}
  centerMode={true}
  className="slider"
  dotListClass="dots"
  draggable
  focusOnSelect={false}
  infinite
  itemClass='item'
  keyBoardControl
  minimumTouchDrag={80}
  renderButtonGroupOutside={true}
  responsive={responsive}>
    {cardTest}
</Carousel>
  )
}


export default ProfileCarousel
