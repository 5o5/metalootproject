import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import lootTheme from "../../scss/lootTheme";
import ResponsiveDrawer from "../Drawer/Drawer";


const useStyle = makeStyles((theme) => ({
    root: {
        padding: '7em 0 0 10em',
        background: lootTheme.colors.primary,

        fontFamily: 'eb_gar',
        minHeight:'100vh',
        [theme.breakpoints.down("sm")]: {
            padding: '7em 1em',
        },
    },
    faqTitle: {
        fontFamily: 'eb_gar',
        color: '#fff',
        fontSize: '2rem',
        paddingBottom: '0.5em'
    }, p2: {
        paddingTop: '2em'
    },
    quesTitle: {
        color: '#fff',
        fontFamily: 'eb_gar',
        fontSize: '1.5rem',
        marginBottom: '1em',
        width: 'fit-content',
        borderBottom: '1px solid #fff',
    },
    quesAns: {
        color: lootTheme.colors.textPrimary,
        fontFamily: 'eb_gar',
        fontSize: '1.2rem',
        paddingBottom: '0.5em',
        whiteSpace: 'pre-line',
        verticalAlign: 'bottom',
        marginLeft:'1em'
    },
    liRoot: {
        display: 'flex',
        flexWrap:'wrap'
    },
    anchorTag:{
        fontSize:'1.3rem',
        color:'#fff',
        textDecoration:'none',
        '&:hover':{
            textDecoration:'underline'
        }

    },rmwGrid:{
        // marginTop:'-70px',
        [theme.breakpoints.down("sm")]: {
            marginTop:'0px'
        },
    }
}))

const Resources = (props) => {
    const classes = useStyle()
    const resourcesArr = [
        {
            title: 'Community Discord',
            listItems: [
                {
                    name: 'Discord',
                    href: '#'
                }
            ]
        },
        {
            title: 'Official open sea links of projects', sub: 'You can find below the official open sea collection links for the projects included under Metaloot',
            listItems: [
                {
                    name: 'CryptoPunks',
                    href: 'https://opensea.io/collection/cryptopunks'
                },
                {
                    name: 'Bored Ape Yatch Club',
                    href: 'https://opensea.io/collection/boredapeyachtclub'                
                },
                {
                    name: 'Cool Cats',
                    href: 'https://opensea.io/collection/cool-cats-nft'                
                },
                {
                    name: 'Pudgy Penguins',
                    href: 'https://opensea.io/collection/pudgypenguins'
                },
                {
                    name: 'Bored Ape Kennel Club',
                    href: 'https://opensea.io/collection/bored-ape-kennel-club'                
                },
                {
                    name: 'Mutant Ape Yatch Club',
                    href: 'https://opensea.io/collection/mutant-ape-yacht-club'
                },
                {
                    name: 'Loot Project',
                    href: 'https://opensea.io/collection/lootproject'
                },
                {
                    name: 'ON1 Force',
                    href: 'https://opensea.io/collection/0n1-force'
                },
                {
                    name: 'World of Women',
                    href: 'https://opensea.io/collection/world-of-women-nft'
                },
                {
                    name: 'Cyberkongz',
                    href: 'https://opensea.io/collection/cyberkongz'
                },
                {
                    name: 'Cyberkongz VX',
                    href: 'https://opensea.io/collection/cyberkongz-vx'
                },
                {
                    name: 'Gutter Rats',
                    href: 'https://opensea.io/collection/gutterrats'
                },
                {
                    name: 'Gutter Cat Gang',
                    href: 'https://opensea.io/collection/guttercatgang'
                },
                {
                    name: 'Hashmasks',
                    href: 'https://opensea.io/collection/hashmasks'
                }
            ]
        }
    ]
    return (
        <>
            <ResponsiveDrawer />
            <Grid container className={classes.root}>


                {resourcesArr.map((item) => (<>
                    <Grid  lg={12} md={12}>
                        <Typography className={classes.faqTitle}>
                            {item.title}
                        </Typography>
                        <Typography className={classes.quesAns}>
                            {item.sub}
                        </Typography>
                    </Grid>
                    <Grid  lg={12} md={12} className={classes.rmwGrid}>
                        <ul>
                            {item.listItems.map((val) => (
                                <li style={{color:'#fff'}} >
                                    <Grid className={classes.liRoot}>
                                        <a className={classes.anchorTag} href={val.href} target="_blank">{val.name} :</a>
                                        <Typography className={classes.quesAns}>
                                            {val.name} official open sea collection
                                        </Typography>
                                    </Grid>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                </>))}

            </Grid>
        </>)
}

export default Resources