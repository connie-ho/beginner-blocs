/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useWalletConnection from "../hooks/use-wallet-connection";
import useInteract from "../hooks/use-interact";
import { makeStyles } from '@mui/styles';
import {Input, Typography, Button, Box } from "@mui/material";


const useStyles = makeStyles((theme)=> ({
  container: {
    height: '90vh',
    width: '75%',
    background: `white`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 3),
  },
  header: {
    color: theme.palette.text.light,
    paddingBottom: theme.spacing(1)
  },
  text:{
      color: theme.palette.text.light,
  }
}))



const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
//   const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //const [_url, setURL] = useState("");
  const [file, setFile] = useState('');

  const {connectWallet,} = useWalletConnection();
  const {getCurrentWalletConnected, mintNFT} = useInteract();

  //styling class
  const classes = useStyles();


  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    // setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        //   setStatus("");
        } else {
          setWallet("");
        //   setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
    //   setStatus(
    //     <p>
    //       {" "}
    //       {" "}
    //       <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
    //         You must install Metamask, a virtual Ethereum wallet, in your
    //         browser.
    //       </a>
    //     </p>
    //   );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    // setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(file, name, description);
    // setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setFile("");
      //setURL("");
    }
  };

  const onChange = e =>{
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = function(upload) {
        setFile({
            image: upload.target.result
        });
    }
    reader.readAsDataURL(file); 
  }

  // const onChange = (e) => {
  // let files = e.target.files;
  // setFile({ files: files[0] }, () => { console.log(this.state.files) });
  // console.log("here",files[0]);
  // }

  return (
    <div className="Minter">
        {/* <section className={classes.container}> */}
      {/* <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button> */}

      {/* <Button id="walletButton" role="button" color="primary" className={classes.button} variant="outlined" size="medium" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
                ) : (
                <span>Connect Wallet</span>
            )}
     </Button> */}

      {/* <h1 id="title" align ="center">Create Your Own NFT!</h1>
       */}
        {/* <section className={classes.container}> */}
        <Box
      sx={{
        width: 1800,
        height: 830,
        align: "center",
        backgroundColor: 'primary.light',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.8],
        },
      }}>
          <br></br>
        <Box sx={{ color: 'text.light' }}>
        <Typography className="MuiTypography-alignJustify" variant ="h3" align ="center">Create Your Own NFT!</Typography>
        </Box>
      {/* <p>
        Simply add your asset's Image, name, and description, then press "Mint."
      </p> */}
     <Box sx={{ color: 'text.light', margin: 10}}>
      <Typography className="MuiTypography-subtitle1" variant ="subtitle1" align ="center" variant ="h4"> Simply add your asset's Image, name, and description, then press "Mint NFT"
      </Typography>
      </Box>

      
      <form>
        
        {/* <h2>🖼 Upload Image: </h2> */}
        <Box sx={{ color: 'text.light', margin: 10, ml: 32}}>
        {/* <Typography className="MuiTypography-subtitle1" variant ="subtitle1" align ="left" variant ="h4">🖼 Upload Image:  <input align ="center" type="file" className="custom-file-input" id="customFile" encType="multipart/form-data" onChange={onChange}/> </Typography> */}
        <Typography className="MuiTypography-subtitle1" variant ="subtitle1" align ="left" variant ="h4">🖼 Upload Image:   <Input disableUnderline="true" type="file" sx ={{color: "white"}}className="MuiInput-formControl"   onChange={onChange}/></Typography>
        
          {/* <div className="custom-file mb-4"> */}
           
          {/* </div> */}
        </Box>
        <Box sx={{ color: 'text.light', margin: 10, ml: 32}}>
        <Typography className="MuiTypography-subtitle1" variant ="subtitle1" align ="left" variant ="h4"> Name: 
        {/* <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)} */}
          <Input sx ={{ml:5, pl:5,color: "white"}}className="MuiInput-formControl"  placeholder="e.g. My first NFT!"  onChange={(event) => setName(event.target.value)}/>
        </Typography>
        </Box>
        {/* <Input inputComponent='input' inputProps = {<input type="text", placeholder="e.g. My first NFT!">}/></Input> */}
        <Box sx={{ color: 'text.light', margin: 10, ml: 32}}>
         <Typography className="MuiTypography-subtitle1" variant ="subtitle1" align ="left" variant ="h4">Description of your NFT: <Input sx ={{ml:2, pl:2 ,color: "white", width: 500}}className="MuiInput-formControl"  placeholder="e.g. Even cooler than cryptokitties" onChange={(event) => setDescription(event.target.value)}/></Typography></Box>
        {/* //   type="text"
        //   placeholder="e.g. Even cooler than cryptokitties ;)"
        //   onChange={(event) => setDescription(event.target.value)}
        // */}
        
      </form>
      <Box component="span" sx={{ p: 10 ,ml:100}} align ="center">
        <Button align ="center" role="button" color="secondary" className={classes.button} variant="contained" size="large" onClick={onMintPressed}>
            Mint NFT
        </Button>
        </Box>
        {/* <Typography className="MuiTypography-paragraph" variant ="subtitle1" align ="center" paragraph = "true">{status}</Typography> */}
        {/* </section> */}

       </Box>
    </div>
    
  );
};

export default Minter;
