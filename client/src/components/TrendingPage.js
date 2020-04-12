import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import DataBaseService from "../services/DatabaseService";

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
    height: "90%",
  },
}));

export default function TrendingPage() {
  const classes = useStyles();
  const dbService = new DataBaseService();
  const [streams, setStreams] = React.useState([

  ]);

  const fetchData = async () => {
    const trendingList = [];
    const allSess = await dbService.getRunningSessions();
    allSess.forEach((s) => {
      trendingList.push({
        img: "//source.unsplash.com/random",
        title: s.data.title || "Title Not Found",
        author: s.data.streamer,
      });
    });
    setStreams(trendingList);
    console.log(allSess);
  };

  React.useEffect(() => {
    if (streams.length === 0) {
      fetchData();
    }
  });

  const imgOnclick = () => {
  //   await fetchData();
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList}>
        {streams.map((session, index) => (
          <GridListTile key={"trending#" + index}>
            <img src={session.img} alt={session.title} onClick={imgOnclick} />
            <GridListTileBar title={session.title} subtitle={<span>by: {session.author}</span>} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
