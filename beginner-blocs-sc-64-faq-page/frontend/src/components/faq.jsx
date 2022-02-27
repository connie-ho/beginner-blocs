import React from 'react';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme)=> ({
    header: {
        height: '2px',
        color: theme.palette.text.primary,
        // backgroundColor: "hsl(242, 25%, 50%)",
        paddingBottom: theme.spacing(1)
    },
    h1text: {
        textAlign: "center",
    },
    cdfaq : {
        content: 'mobile',
        boxShadow: "0px 1px 2px rgba(0, 0, 0, .085)",
        // "0 1px 8px rgba(0, 0, 0, .1)",
        position: "relative",
        display: "flex"
    },

    categories: {
        width: "200px",
        position: "-webkit-sticky",
        alignItemsFlexStart: 'start',
        alignSelf: "flex-start",
        flexNegative: 0,
        flexShrink: 0,
        top: '20px',
        widths: '20%',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, .085)',
        marginTop: '1.25em',
        // boxShadow: '0px 1px 2px rgba(0, 0, 0, .085)', '0px 1px 8px rgba(0, 0, 0, .1)',
    },
    category:{
        // position: "-webkit-sticky",
        position: "sticky",
        display: 'block',
        height: '50px',
        lineHeight:'50px',
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
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    items:{
        position: "static",
        height: "auto",
        width: "auto",
        msFlexPositive: 1,
        flexGrow: 1,
        overflow: "visible",
        padding: '0 0 0 0.75em',
        background: "transparent",
    },
    groups:{
        display: "block",
        paddingTop: '1px',
    },
    grouptitle:{
        margin: '1.25em 0',
        marginBottom: '0.75em',
        fontSize: '0.69444em',
        fontWeight: 700,
        color: "hsl(240, 1%, 74.7%)",
    },
    gitem:{
        background: 'hsl(0, 0%, 100%)',
        marginBottom: '2em',
        paddingTop: '0.75em',
        padding: '0 0.75em',
        boxShadow: '0 1px 10px hsla(60, 0%, 38%, 0.3)',
    },
    itemcontext:{
        fontSize: '0.95em',
        color: theme.palette.text,
        // color: 'hsl(60, 0%, 38%)',
        padding: '0 0.75em',
        paddingBottom: '1.25em',
        overflow: 'hidden',
    },
    trigger:{
        fontSize: '1.3em',
        positional: "relative",
        margin: '1.25em 0 0.5em',
        color: theme.palette.secondary,
        // color: 'hsl(0, 0%, 0%)',
    },
    container:{
        width: '75%',
        marginLeft: 'auto',
        marginRight:'auto',
        maxWidth: '64rem',
        marginTop: '2em',
        marginBottom: '2em',
    },
}
))


const FAQ = () => {
    const classes = useStyles()
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
                    <li><a className={`${classes.category} ${classes.truncate}`} href="#basics">Basics</a></li>
                    <li><a className={`${classes.category} ${classes.truncate}`} href="#account">Account</a></li>
                    <li><a className={`${classes.category} ${classes.truncate}`} href="#creating">Creating</a></li>
                    <li><a className={`${classes.category} ${classes.truncate}`} href="#trading">Trading</a></li>
                    <li><a className={`${classes.category} ${classes.truncate}`} href="#otherquestions">Other questions</a></li>
                </ul>
                <div className={classes.items}>
                    <ul id="basics" className={classes.groups}>
                        <li className={classes.grouptitle}><h2>Basics</h2></li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>What are Non-Fungible Token(NFT) and web3?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>What is a crypto wallet and how does it work in Marketplace?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>Which currencies and blockchains does Marketplace support?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I convert crypto to my local currency and vice versa?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                    </ul>
                    <ul id="account" className={classes.groups}>
                        <li className={classes.grouptitle}><h2>Account</h2></li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I create a Marketplace account?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I set up my personal profile?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I connect my Metamask wallet to my account?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I invite other friends to Marketplace and get rewards?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                    </ul>
                    <ul id="creating" className={classes.groups}>
                        <li className={classes.grouptitle}><h2>Creating</h2></li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I create an NFT?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>What format of NFT is supported in Marketplace?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I put my NFT on sale?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I manage my NFTs?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                    </ul>
                    <ul id="trading" className={classes.groups}>
                        <li className={classes.grouptitle}><h2>Trading</h2></li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I buy an NFT in Marketplace?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>Where can I find NFTs that I purchased?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>Where can I check the history price of an NFT?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I sell an NFT in Marketplace?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I change the price of my NFT?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How do I cancel a listing of an NFT?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>Where can I check my sold and unsold NFTs?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae quidem blanditiis delectus corporis, possimus officia sint sequi ex tenetur id impedit est pariatur iure animi non a ratione reiciendis nihil sed consequatur atque repellendus fugit perspiciatis rerum et. Dolorum consequuntur fugit deleniti, soluta fuga nobis. Ducimus blanditiis velit sit iste delectus obcaecati debitis omnis, assumenda accusamus cumque perferendis eos aut quidem! Aut, totam rerum, cupiditate quae aperiam voluptas rem inventore quas, ex maxime culpa nam soluta labore at amet nihil laborum? Explicabo numquam, sit fugit, voluptatem autem atque quis quam voluptate fugiat earum rem hic, reprehenderit quaerat tempore at. Aperiam.</p>
                            </div>
                        </li>
                    </ul>
                    <ul id="otherquestions" className={classes.groups}>
                        <li className={classes.grouptitle}><h2>Other Questions</h2></li>
                        <li className={classes.gitem}>
                            <a className={classes.trigger} href="#0">
                                <span>How can I contact Marketplace if I have unsolved questions?</span>
                            </a>
                            <div className={classes.itemcontext}>
                                <p>You can send a request to our official email: y66wan@uwaterloo.ca. Please remember to include your wallet address.
                                </p></div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default FAQ