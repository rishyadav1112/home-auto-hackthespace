import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  BigTranscript,
  BigTranscriptContainer,
  ErrorPanel
} from "@speechly/react-ui";
import "./App.module.scss";
import Layout from "./hoc/Layout/Layout";
import RoomsDashboard from "./containers/RoomsDashboard/RoomsDashboard";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import { SpeechProvider, useSpeechContext } from "@speechly/react-client";
function App() {
  const AsyncRoomsDevices = asyncComponent(() =>
    import("./containers/RoomsDashboard/RoomDevices/RoomDevices")
  );
const { segment } = useSpeechContext()
  return (
   
    <Layout>
     <SpeechProvider appId="e59019fa-5fe0-4fd7-9dab-60143d097154" language="en-US">
      <BigTranscriptContainer>
        <BigTranscript />
      </BigTranscriptContainer>
       <div>
      {segment ? <div className="segment">{segment.words.map(w => w.value).join(' ')}</div> : null}
    </div>
      <PushToTalkButtonContainer>
        <PushToTalkButton captureKey=" " />
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </SpeechProvider>
      <Switch>
        <Route path="/room/:id" exact component={AsyncRoomsDevices} />
        <Route path="/" exact component={RoomsDashboard} />
      </Switch>
    </Layout>
  );
}

export default App;
