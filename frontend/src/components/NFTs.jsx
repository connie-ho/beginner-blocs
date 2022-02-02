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


const NFTs = () => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState('not-loaded')

    useEffect(() => {
      loadNFTs()
    }, [])

    async function loadNFTs() {    
      const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/0f9683418f3d46a6b4904bee7eea9f7c')
      const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
      const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
      const data = await marketContract.fetchMarketItems()
      
      const items = await Promise.all(data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        }
        return item
      }))
      setNfts(items)
      setLoading(false) 
    }

    if(loading){
        return (
            <div>
              Loading
          </div>
      )
    }

    const NftCards = nfts.map(nft => (
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
