/**
 *
 * Game
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1em',
  },
  paper: {
    padding: '1em',
  },
  text: {
    fontSize: '1.44em',
  },
}));

interface Props { }

const Game = memo((props: Props) => {
  const classes = useStyles();

  return (
    <Layout>
      <Head>
        <title>Games</title>
        <meta name="description" content="Description of Games" />
      </Head>
      <Grid container justify="center" className={classes.root}>
        <Grid item md={11}>
          <Grid container>
            <Grid item md={4}>
              <Paper className={classes.paper}>
                <Link href="/games/xiangqi">
                  <a>
                    <Typography className={classes.text} component="h3">
                      中国象棋
                    </Typography>
                  </a>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
});

export default Game;
