import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

import CardItem from "./CardItem"

const Preview = styled('img')(({theme}) => ({
    height: theme.typography.pxToRem(300),
    width: '100%',
}))

const Details = styled('div')(({theme})=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1,1,1)
}))

const Price = styled('div')(({theme})=>({
    display: 'flex',
    justifyContent: 'space-between',
}))

const EthIcon = styled(FontAwesomeIcon)(({theme}) => ({
    marginLeft: '0.25rem',
    color: theme.palette.text.secondary
}))


const NFTCard = ({onClick, image, name, price, ...props}) => {
    return (
        <CardItem 
            onClick={onClick}
            {...props}
        >
            <Preview src={image} alt={name}/>
            <Details>
                <h2>{name}</h2>
                <Price>
                    {price}
                    <EthIcon icon={faEthereum} size="lg" swapOpacity />
                </Price>
            </Details>
        </CardItem>
    )
}

export default NFTCard;