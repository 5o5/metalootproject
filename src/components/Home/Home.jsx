import React, { useState, useCallback, useEffect } from "react";
import { Button, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core"
import lootTheme from "../../scss/lootTheme"
import ResponsiveDrawer from "../Drawer/Drawer"
import bag1 from "../../Assets/images/bag1.png"
import bag2 from "../../Assets/images/bag2.png"
import bag3 from "../../Assets/images/bag3.png";
import clsx from "clsx"
import Web3 from 'web3';

let web3
let NFTSmartContract

const useStyles = makeStyles((theme) => ({
    "@global": {
        '.MuiGrid-grid-lg-12': {
            height: 'fit-content'
        }
    },
    root: {
        padding: '7em 10em',
        minHeight: '100vh',
        background: lootTheme.colors.primary,
        [theme.breakpoints.down("sm")]: {
            padding: "8em 1em",
        },
        fontFamily: 'eb_gar'
    },
    lootTitle: {
        fontSize: '4rem',
        color: '#fff',
        fontWeight: '100',
        [theme.breakpoints.down("sm")]: {
            fontSize: '2rem',
            width: '100%',
            textAlign: 'center'
        },
        fontFamily: 'eb_gar'
    },
    lootDesc: {
        fontFamily: 'eb_gar',
        color: lootTheme.colors.textPrimary,
        fontSize: '1.6rem',
        [theme.breakpoints.down("sm")]: {
            textAlign: 'center'
        },
    },
    p5: {
        paddingTop: '3em'
    },
    p2: {
        paddingTop: '2em'
    },
    p25: {
        padding: '0 25em'
    },
    pr10: {
        paddingRight: '5em',
        [theme.breakpoints.down("sm")]: {
            paddingRight: '0em',
        },
    },
    btnWrapInc: {
        [theme.breakpoints.down("sm")]: {
            padding: '2em',
            borderBottom: '1px solid #3b3b3b',
            borderTop: '1px solid #3b3b3b',
            marginTop: '2em'
        },
    },

    bagImg: {
        width: '400px',
        [theme.breakpoints.down("sm")]: {
            width: '100%'
        },
    },
    dFlexSB: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

    },

    incBtnWrap: {
        height: "40px",
        width: "40px",
        color: "#fff",
        border: "3px solid",
        borderRadius: "35px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    mintBtn: {
        background: '#000',
        color: '#fff',
        padding: '0 4em'
    },
    anchorTag:{
        fontSize:'1.3rem',
        color:'inherit',
    

    }
}))

const Home = (props) => {
    const classes = useStyles()
    const bagsArr = [{ src: bag1, name: 'BagImg1' }, { src: bag2, name: 'BagImg2' }, { src: bag3, name: 'BagImg3' }]
    const [isIncrement, setIsIncrement] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [remainCnt, setRemainCnt] = useState(9969)

    const handleDecrement = () => {
        setIsIncrement(isIncrement - 1)
    }
    const handleIncrement = () => {
        setIsIncrement(isIncrement + 1)
    }
    //mint button handler
    const handleMint = async () => {
        console.log(remainCnt.toLocaleString());
        console.log(isIncrement);
        await loadWeb3();

        const addresses = await web3.eth.getAccounts()
        const senderAddress = addresses[0]
        setIsLoading(true);
        NFTSmartContract.methods.claimMetaloots(isIncrement)
            .send({
                from: senderAddress,
                value: isIncrement * 10000000000000000
            })
            .on('sent', function (send) {
                setIsLoading(true);
            })
            .on('receipt', function (receipt) {
                setIsLoading(false);
                window.alert("Minting complete. You can now headover to OpenSea!");
                loadWeb3();
            })
            .on('error', function (error) {
                setIsLoading(false);
                window.alert("Error: " + JSON.stringify(error.message))
            });
    }


    const loadWeb3 = useCallback(async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider)
        }
        if (web3) {
            setIsLoading(false)
            NFTSmartContract = new web3.eth.Contract(
                [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint16","name":"from","type":"uint16"},{"internalType":"uint16","name":"to","type":"uint16"}],"name":"addAvailableMetaloots","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"cut","type":"uint256"}],"internalType":"struct MetalootProject.Collaborators[]","name":"_collaborators","type":"tuple[]"}],"name":"addCollaborators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"owners","type":"address[]"},{"internalType":"uint16[]","name":"tokenIds","type":"uint16[]"}],"name":"airdropTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimMetaloot","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"claimMetaloots","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAvailableMetaloots","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getmintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"giveawayCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"tokenId","type":"uint16"}],"name":"isMetalootAvailable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"premintingComplete","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"tokenId","type":"uint16"}],"name":"removeMetalootFromAvailableMetaloots","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"reserveMetaloots","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setBaseTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintPrice","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startClaimDate","type":"uint256"}],"name":"setStartClaimDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
                '0x7d12ef97d1536b07B86Ec03Ebcc4f87C132486CC',
            )
            console.log({ NFTSmartContract })
            const addresses = await web3.eth.getAccounts()
            const senderAddress = addresses[0]
            NFTSmartContract.methods
                .getAvailableMetaloots()
                .call({
                    from: senderAddress,
                })
                .then((remainingSupply) => {
                    console.log(remainingSupply);
                    setRemainCnt(remainingSupply)
                })
        } else {
            setIsLoading(false)
            window.alert(
                'Not connected to a Web3 Wallet! Please install/connect to Metamask on your browser.',
            )
        }
    }, [setIsLoading, setRemainCnt])
    const loadWithLoading = useCallback(async () => {
        setIsLoading(true)
        await loadWeb3()
        setIsLoading(false)
    }, [loadWeb3, setIsLoading])

    useEffect(() => {
        loadWithLoading()
    }, [loadWithLoading])
    return (
        <>
            <ResponsiveDrawer />
            <Grid className={classes.root}>
                <Grid item lg={12} md={12} >
                    <Typography className={classes.lootTitle}>
                        MetaLoot
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item lg={10} md={10} xs={12}>
                        <Typography className={clsx(classes.lootDesc, classes.pr10)} style={{ letterSpacing: '4px' }}>
                            Metaloot is a collection of 8,000 unique NFTs of NFTs. On release, anyone can claim Metaloot for 0.01 ETH.
                            Each list contains prints of 6 random mints from 14 possible collections – Metaloot grants you ownership of the unique list not of listed NFTs.
                            Metaloot is an unaudited project. Out of 8000 metaloots 50 will be reserved by contract deployer.

                            Not all Metaloots are created equial. Some are more difficult than others – you can tell from each Metaloot’s composite score. Collect all mints on your list to see what happens.
                        </Typography>
                    </Grid>
                    <Grid item lg={2} md={2} xs={12} className={clsx(classes.dFlexSB, classes.btnWrapInc)} style={{ flexDirection: 'column' }}>
                        <Grid item xs={12} className={classes.dFlexSB} style={{ width: '100%' }}>
                            <div className={classes.incBtnWrap} style={{ pointerEvents: isIncrement <= 1 && 'none', background: isIncrement <= 1 && 'rgb(204 204 204 / 50%)' }}
                                onClick={handleDecrement}>-</div>
                            <p style={{ color: '#fff', fontSize: '1.2rem' }}>{isIncrement}</p>

                            <div className={classes.incBtnWrap} style={{ pointerEvents: isIncrement >= 10 && 'none', background: isIncrement >= 10 && 'rgb(204 204 204 / 50%)' }}
                                onClick={handleIncrement}>+</div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleMint} className={classes.mintBtn}>
                                {isLoading ?
                                    <CircularProgress />
                                    :
                                    <p>Mint</p>}
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item lg={12} md={12} className={classes.p5}>
                    <Typography className={classes.lootDesc} style={{ fontSize: '1.2rem' }}>
                        Example Shopping List:
                    </Typography>
                    <Grid container className={classes.p2} >
                        {bagsArr.map((item) => (<>
                            <Grid item lg={4} md={4} key={item.name}>
                                <img src={item.src} className={classes.bagImg} height={400} alt={item.name} />
                            </Grid>
                        </>))}
                    </Grid>
                </Grid>
                <Grid item lg={12} md={12} className={classes.p5} style={{ textAlign: 'center' }}>
                    <Typography className={classes.lootDesc} style={{ fontSize: '1.2rem' }}>
                        This website is  <a  className={classes.anchorTag} href='https://github.com/MetalootDev/metalootproject' target="_blank">open-source</a>
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
export default Home


// Add collaborators
// Add metaloots 