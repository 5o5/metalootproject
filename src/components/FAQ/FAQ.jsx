import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import lootTheme from "../../scss/lootTheme";
import faqArr from "../../Assets/data/faq.json";
import ResponsiveDrawer from "../Drawer/Drawer";


const useStyle = makeStyles((theme) => ({
    root: {
        padding: '7em 10em',
        background: lootTheme.colors.primary,
        fontFamily: 'eb_gar',
        
        [theme.breakpoints.down("sm")]: {
            padding: '7em 1em',
        },
    },
    faqTitle: {
        fontFamily: 'eb_gar',
        color: '#fff',
        fontSize: '2rem'
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
        paddingBottom: '2em',
        whiteSpace: 'pre-line',
        verticalAlign: 'bottom'
    }
}))

const FAQ = (props) => {
    const classes = useStyle()
    return (
        <>
              <ResponsiveDrawer />
            <Grid container className={classes.root}>
                <Grid item lg={12} md={12}>
                    <Typography className={classes.faqTitle}>
                     Frequently Asked Questions
                    </Typography>
                </Grid>
                <Grid item lg={12} md={12} className={classes.p2}>
                    {faqArr.faqArr.map((item) => (
                        <>
                            <Typography className={classes.quesTitle}>
                                {item.question}
                            </Typography>
                            <Typography className={classes.quesAns}>
                                {item.answer}
                            </Typography>
                        </>))}

                </Grid>
            </Grid>
        </>)
}

export default FAQ