import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "80%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TrendingPage() {
  const classes = useStyles();

  const trendingList = []
  for (let i=0; i<50; i++){
    trendingList.push({
      img: "//source.unsplash.com/random",
      title: "Something Fun",
      author: "Hien Le"
    });
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList}>
        {trendingList.map((session, index) => (
          <GridListTile key={"trending#" + index}>
            <img src={session.img} alt={session.title}/>
            <GridListTileBar
              title={session.title}
              subtitle={<span>by: {session.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${session.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};