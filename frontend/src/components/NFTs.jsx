import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material'

import { ethers } from 'ethers'
import axios from 'axios'

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

import CardItem from './common/CardItem';
import { useGetNFTs } from '../hooks/use-get-nfts';


const NFTs = () => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)

    const {loadNFTs} = useGetNFTs()

    useEffect(() => {
      const fetchItems = async () => {
        const items = await loadNFTs()
        setNfts(items)
        setLoading(false) 
      }

      fetchItems()
    }, [loadNFTs])

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
