import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material'

import { useGetNFTs } from '../hooks/use-get-nfts';
import { EthersContext } from '../contexts/ethers-provider-context';

import CardItem from './common/CardItem';

const NFTs = () => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)
    const { tokenContract, marketContract } = useContext(EthersContext)

    const { loadNFTs } = useGetNFTs()

    useEffect(() => {
      const fetchItems = async () => {
        const items = await loadNFTs({ tokenContract, marketContract })
        setNfts(items)
        console.log(items)
        setLoading(false) 
      }

      fetchItems()
    }, [loadNFTs, tokenContract, marketContract])

    if(loading){
        return (
            <div>
              Loading
          </div>
      )
    }

    const NftCards = nfts?.map(nft => (
        <CardItem>
            <img
            src={nft.image}
            alt={nft.name}
            />
          <h2>{nft.name}</h2>
          <p>{nft.price}</p>
        </CardItem>
    ))

  return (
    <Grid>
        { NftCards }
    </Grid>
  )
}

export default NFTs;
