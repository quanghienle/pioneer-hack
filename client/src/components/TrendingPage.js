import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { OT, OTPublisher, OTStreams, OTSubscriber, createSession } from "opentok-react";

import DataBaseService from "../services/DatabaseService";

import { Config } from "./tokConfig";

const { API_KEY, API_SECRET } = Config;

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
  const [streamers, setStreamers] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const [sessionHelper, setSessonHelper] = React.useState({ session: null });
  const [streams, setStreams] = React.useState([]);

  const fetchData = async () => {
    const trendingList = [];
    const allSess = await dbService.getRunningSessions();
    allSess.forEach((s) => {
      trendingList.push({
        img: "//source.unsplash.com/random",
        id: s.id,
        token: s.data.token,
        title: s.data.title || "Title Not Found",
        author: s.data.streamer,
      });
    });
    setStreamers(trendingList);
    console.log(allSess);
    setFetched(true);
  };

  React.useEffect(() => {
    if (!fetched) {
      fetchData();
    }
  });


  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList}>
        {streamers.map((session, index) => {
          const helper = createSession({
            apiKey: API_KEY,
            sessionId: session.id,
            token: session.token,
            onStreamsUpdated: (strms) => {
              // setStreams(strms);
            },
          });

          return (
            <GridListTile key={"trending#" + index}>
              <OTPublisher
                session={helper.session}
                properties={{ width: 200, height: 200 }}
              />
              {/* <img
                src={session.img}
                alt={session.title}
                // onClick={() => imgOnclick(session.id, session.token)}
              /> */}
              <GridListTileBar title={session.title} subtitle={<span>by: {session.author}</span>} />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}
