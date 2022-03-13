/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useState } from 'react';
import useInteract from '../hooks/use-interact';
import { makeStyles } from '@mui/styles';
import { Link, Grid, Input, Typography, Button, Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
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
    paddingBottom: theme.spacing(1),
  },
  text: {
    color: theme.palette.text.light,
  },
}));

const Minter = () => {
  const [, setWallet] = useState('');
  const [status, setStatus] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  //const [_url, setURL] = useState("");
  const [file, setFile] = useState('');
  const { getCurrentWalletConnected, mintNFT } = useInteract();

  //styling class
  const classes = useStyles();

  useEffect(async () => {
    const { address } = await getCurrentWalletConnected();

    setWallet(address);
    // setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          //   setStatus("");
        } else {
          setWallet('');
          setStatus('🦊 Connect to Metamask using the top right button.');
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

  //   const connectWalletPressed = async () => {
  //     const walletResponse = await connectWallet();
  //     // setStatus(walletResponse.status);
  //     setWallet(walletResponse.address);
  //   };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(file, name, description);
    setStatus(status);
    if (success) {
      setName('');
      setDescription('');
      setFile('');
      //setURL("");
    }
  };

  const onChange = (e) => {
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = function (upload) {
      setFile({
        image: upload.target.result,
      });
    };
    reader.readAsDataURL(file);
    console.log(file.name);
  };

  // const onChange = (e) => {
  // let files = e.target.files;
  // setFile({ files: files[0] }, () => { console.log(this.state.files) });
  // console.log("here",files[0]);
  // }

  return (
    <div className="Minter">
      <Box
        sx={{
          width: 1728,
          height: 830,
          align: 'center',
          backgroundColor: 'white',
        }}
      >
        <br></br>

        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ color: 'text.dark' }}>
            <Typography className="MuiTypography-alignJustify" variant="h3" align="center">
              Create Your Own NFT!
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ color: 'text.dark' }}>
            <Typography
              paragraph="true"
              className="MuiTypography-subtitle1"
              variant="subtitle1"
              align="center"
              variant="h4"
            >
              {' '}
              Simply upload your Asset's Image, add a Name, and a Description for your Asset
              <br />
              Then press "Mint NFT"
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={6}>
            <Grid item xs={12} sx={{ color: 'text.dark', mt: 5 }}>
              <Typography className="MuiTypography-subtitle1" variant="subtitle1" align="left" variant="h4">
                🖼 Upload Image:{' '}
                <Input
                  disableUnderline="true"
                  type="file"
                  sx={{ ml: 5, pb: 2, color: 'black' }}
                  className="MuiInput-formControl"
                  onChange={onChange}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ color: 'text.dark', mt: 5 }}>
              <Typography className="MuiTypography-subtitle1" variant="subtitle1" align="left" variant="h4">
                {' '}
                Name:
                <Input
                  sx={{ ml: 5, pl: 5, color: 'black' }}
                  className="MuiInput-formControl"
                  placeholder="e.g. My first NFT!"
                  onChange={(event) => setName(event.target.value)}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <br></br>
            </Grid>
            <Grid item xs={12} sx={{ color: 'text.dark', mt: 5 }}>
              <Typography className="MuiTypography-subtitle1" variant="subtitle1" align="left" variant="h4">
                Description of your NFT:{' '}
                <Input
                  sx={{ ml: 2, pl: 2, color: 'black', width: 300 }}
                  className="MuiInput-formControl"
                  placeholder="e.g. Even cooler than cryptokitties"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={2}
            style={{ padding: '0', margin: '0' }}
            sx={{
              align: 'center',
              border: '1px solid grey',
              borderRadius: '10px',
              minHeight: '20rem',
              minWidth: '20rem',
            }}
          >
            <img
              style={{ border: '1px solid grey', borderRadius: '10px', objectFit: 'cover', height: '100%' }}
              width="100%"
              src={file.image}
              alt="Preview"
            />
          </Grid>
        </Grid>

        <Box component="span" sx={{ p: 10, ml: 95 }} align="center">
          <Button
            align="center"
            role="button"
            color="secondary"
            className={classes.button}
            variant="contained"
            size="large"
            onClick={onMintPressed}
          >
            Mint NFT
          </Button>
        </Box>
        <br />
        <br />
        <br />

        <Typography
          className="MuiTypography-paragraph"
          variant="subtitle1"
          align="center"
          paragraph="true"
          color={'black'}
        >
          {' '}
          <Link href={status.slice(-98)} rel="noopener noreferrer" target="_blank">
            {status}
          </Link>{' '}
        </Typography>
      </Box>
    </div>
  );
};

export default Minter;
