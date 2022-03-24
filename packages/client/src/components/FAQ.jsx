import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '2px',
    color: theme.palette.text.primary,
    // backgroundColor: "hsl(242, 25%, 50%)",
    paddingBottom: theme.spacing(1),
  },
  h1text: {
    textAlign: 'center',
  },
  cdfaq: {
    content: 'mobile',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, .085)',
    // "0 1px 8px rgba(0, 0, 0, .1)",
    position: 'relative',
    display: 'flex',
  },

  categories: {
    width: '200px',
    position: '-webkit-sticky',
    alignItemsFlexStart: 'start',
    alignSelf: 'flex-start',
    flexNegative: 0,
    flexShrink: 0,
    top: '20px',
    widths: '20%',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, .085)',
    marginTop: '1.25em',
    // boxShadow: '0px 1px 2px rgba(0, 0, 0, .085)', '0px 1px 8px rgba(0, 0, 0, .1)',
  },
  category: {
    // position: "-webkit-sticky",
    position: 'sticky',
    display: 'block',
    height: '50px',
    lineHeight: '50px',
    padding: '0 2em 0 1.05em',
    // color: 'hsl(0, 0%, 100%)',
    color: theme.palette.secondary,
    // backgroundColor: 'hsl(242, 25%, 50%)',
    fontSmooth: 'antialiased',
    // borderColor: 'hsl(242, 25%, 55%)',
    // borderBottom: '1px solid hsl(213, 7%, 36.3%)',
  },
  // categoryselected: {
  //     backgroundColor: "hsl(242, 25%, 50%)",
  // },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  items: {
    position: 'static',
    height: 'auto',
    width: 'auto',
    msFlexPositive: 1,
    flexGrow: 1,
    overflow: 'visible',
    padding: '0 0 0 0.75em',
    background: 'transparent',
  },
  groups: {
    display: 'block',
    paddingTop: '1px',
  },
  grouptitle: {
    margin: '1.25em 0',
    marginBottom: '0.75em',
    fontSize: '0.69444em',
    fontWeight: 700,
    color: 'hsl(240, 1%, 74.7%)',
  },
  gitem: {
    background: 'hsl(0, 0%, 100%)',
    marginBottom: '2em',
    paddingTop: '0.75em',
    padding: '0 0.75em',
    boxShadow: '0 1px 10px hsla(60, 0%, 38%, 0.3)',
  },
  itemcontext: {
    fontSize: '0.95em',
    color: theme.palette.text,
    // color: 'hsl(60, 0%, 38%)',
    padding: '0 0.75em',
    paddingBottom: '1.25em',
    overflow: 'hidden',
  },
  trigger: {
    fontSize: '1.3em',
    positional: 'relative',
    margin: '1.25em 0 0.5em',
    color: theme.palette.secondary,
    // color: 'hsl(0, 0%, 0%)',
  },
  container: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '64rem',
    marginTop: '2em',
    marginBottom: '2em',
  },
}));

const FAQ = () => {
  const classes = useStyles();
  // const faq = React.createClass({

  // render: function(onClick) {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="../assets/faqcss/style.css" />
      <title>FAQ</title>
      <header className={classes.header}>
        {/*"cd-header flex flex-column flex-center">*/}
        <div className={classes.h1text}>
          <h1>Help Centre FAQ</h1>
        </div>
      </header>
      <section className={`cd-faq ${classes.cdfaq} ${classes.container}`}>
        <ul className={classes.categories}>
          <li>
            <a className={`${classes.category} ${classes.truncate}`} href="#basics">
              Basics
            </a>
          </li>
          <li>
            <a className={`${classes.category} ${classes.truncate}`} href="#account">
              Account
            </a>
          </li>
          <li>
            <a className={`${classes.category} ${classes.truncate}`} href="#creating">
              Creating
            </a>
          </li>
          <li>
            <a className={`${classes.category} ${classes.truncate}`} href="#trading">
              Trading
            </a>
          </li>
          <li>
            <a className={`${classes.category} ${classes.truncate}`} href="#otherquestions">
              Other questions
            </a>
          </li>
        </ul>
        <div className={classes.items}>
          <ul id="basics" className={classes.groups}>
            <li className={classes.grouptitle}>
              <h2>Basics</h2>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>What are Non-Fungible Token(NFT) and web3?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  NFT stands for "non-fungible token." At a basic level, an NFT is a digital asset that links ownership
                  to unique physical or digital items, such as works of art, real estate, music, or videos. Today
                  artists are using NFTs to represent ownership of their unique items. The Ethereum blockchain can
                  secure that their items only have one official owner at a time because no one can modify the record of
                  ownership or copy/paste a new NFT into existence. Web3 is all about decentralisation—from platforms
                  Meta, Alphabet (Google), and Amazon; governments; and the traditional financial system. By placing
                  power in the hands of individuals instead, Web3 promises to deepen the democratisation of the
                  internet.
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How does NFTs work in Marketplace?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  When you create an NFT from digital objects as a representation of digital or non-digital assets, an
                  NFT is minted by executing code stored in smart contracts that conform to different standards, such as
                  ERC-721, and assign ownership and manage the transferability of the NFT's. Basically there are three
                  process: creating a new block, validating information, and recording information into the blockchain.
                  When a you purchases an NFT, the ownership of the unique token is transferred to your wallet via your
                  public address. That is because NFTs give the ability to assign or claim ownership of any unique piece
                  of digital data, trackable by using Ethereum's blockchain as a public ledger. An NFT can only have one
                  owner at a time. Ownership is managed through the uniqueID and metadata that no other token can
                  replicate. With NFT, the proof of ownership of the original assets becomes very easy. Your private key
                  is proof-of-ownership of the original. The content creator's public key serves as a certificate of
                  authenticity for that particular digital artefact. The creators public key is essentially a permanent
                  part of the token's history. The creator's public key can demonstrate that the token you hold was
                  created by a particular individual, thus contributing to its market value (vs a counterfeit).
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>What is a crypto wallet and how does it work in Marketplace?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  The crypto wallet is an app that allows cryptocurrency users to store and retrieve their digital
                  assets in one place. In our NFT marketplace, users are able to login with their Metamask wallet with
                  one quick click. The wallet itself stores addresses and allow users to move coins elsewhere when
                  buying NFTs while also letting others to send coins to user's wallet when selling NFTs. The coins
                  exist on a blockchain and the wallet software allows you to interact with the balances held on that
                  blockchain.
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>Which blockchains does Marketplace support?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  Our NFT Marketplace support decentralized blockchain Ethereum and Polygon. The two blockchains are
                  similar but have slight differences. Trading NFTs can happen peer-to-peer without needing platforms
                  that can take large cuts as compensation. Ethereum establishes a peer-to-peer network that securely
                  executes and verifies application code, called smart contracts that allow participants to transact
                  with each other without a trusted central authority. All Ethereum products share the same "backend"
                  which makes NFTs portable across products. You can buy an NFT on one product and sell it on another
                  easily. As a creator you can list your NFTs on multiple products at the same time – every product will
                  have the most up-to-date ownership information. Ethereum never goes down, meaning your tokens will
                  always be available to sell. Polygon is a blockchain that provides scalable, secure and instant
                  transactions with Ethereum currencies like ETH, USDC and DAI. Currencies must first be "bridged" from
                  Ethereum's mainnet to Polygon. Polygon is a secondary scaling solution for the Ethereum blockchain.
                  Polygon works on top of Ethereum which has become slow and expensive to use as it becomes ever more
                  popular.Jan 3, 2022
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I convert crypto to my local currency and vice versa?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  To cash out your crypto currency, please first decide a third-party broker exchange you are able to
                  use. The third-party exchange usually requires your legal information and takes times to verfiy your
                  identity and bank information. Sign up and complete the brokerage's verification process. Then deposit
                  cryptocurrencies from your wallet into the digital marketplace held by third-party exchange and sell
                  them to an interested buyer. The third-party marketplace will confirm the transaction and transfer
                  money to your verified bank account or PayPal account if applicable.
                </p>
              </div>
            </li>
          </ul>
          <ul id="account" className={classes.groups}>
            <li className={classes.grouptitle}>
              <h2>Account</h2>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I create a Marketplace account?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  To join our NFT marketplace, you first need to create a crypto wallet such as Metamask. Then you can
                  click on the Login button and allow connection between your metamask and our website. There is no need
                  to create a new account since we only access you through wallet.
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I set up my personal profile?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  First login in our website through your own crypto wallet. Move cursor to your account and you will
                  see a profile selection box. Click on profile and enter the profile page. You can upload your assets,
                  setting name and descriptions on that page.
                </p>
              </div>
            </li>
          </ul>
          <ul id="creating" className={classes.groups}>
            <li className={classes.grouptitle}>
              <h2>Creating</h2>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I create an NFT?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  Click on Create button. You are able to enter creating NFT page. After uploading your own digital
                  asset and setting your ideal price, you are able to submit it and wait for blockchain execution
                  complete.
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>What format of NFT is supported in Marketplace?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>Digital asset including pictures, music and videos are allowed in Marketplace.</p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I manage my NFTs?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>Go to your profile page and manage the NFT you want to delete, unlist or list on the Marketplace.</p>
              </div>
            </li>
          </ul>
          <ul id="trading" className={classes.groups}>
            <li className={classes.grouptitle}>
              <h2>Trading</h2>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I buy an NFT in Marketplace?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  Select your favor NFT and click on buy button. Make sure you have enough crypto currencies for the
                  price and transaction fee. Wait for blockchain validation to complete. Once transaction is done, you
                  can check your ownership of this NFT in your profile page.
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>Where can I find NFTs that I purchased?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>You can check your ownership of NFTs in your profile page.</p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>Where can I check the history price of an NFT?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>Emmm. I don't know because this function has not been launched.</p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I sell an NFT in Marketplace?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  Go to your profile page and select the NFT you want to sell. Set the price and list them on the
                  market.
                </p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I change the price of my NFT?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>Emmm. I don't know because this function has not been launched.</p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How do I cancel a listing of an NFT?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>Emmm. I don't know because this function has not been launched.</p>
              </div>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>Where can I check my sold and unsold NFTs?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>In your profile page, you are able to see all NFTs that have been sold or not,</p>
              </div>
            </li>
          </ul>
          <ul id="otherquestions" className={classes.groups}>
            <li className={classes.grouptitle}>
              <h2>Other Questions</h2>
            </li>
            <li className={classes.gitem}>
              <a className={classes.trigger} href="#0">
                <span>How can I contact Marketplace if I have unsolved questions?</span>
              </a>
              <div className={classes.itemcontext}>
                <p>
                  You can send a request to our official email: y66wan@uwaterloo.ca. Please remember to include your
                  wallet address.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
