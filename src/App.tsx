import { GlobalProvider, RootContainer } from "./core";
import "./App.css";

import { ChatIcon, HomeIcon, SearchIcon, NotificationIcon } from "components";
import { Tab, TabList, TabPanel, Tabs } from "components";
import { ThemeSwitcher } from "components";
import { Button } from "components";

const App = () => (
  <>
    <ThemeSwitcher />
    <GlobalProvider>
      <RootContainer initialRoute="/" />
    </GlobalProvider>
    <Tabs
      variant="line"
      defaultValue="home"
      onChange={(value) => console.log("Selected tab:", value)}
    >
      <TabList>
        <Tab value="chat" icon={<ChatIcon />}></Tab>
        <Tab value="search" icon={<SearchIcon />}></Tab>
        <Tab value="notification" icon={<NotificationIcon />}></Tab>
      </TabList>
      <TabPanel value="chat">Hello</TabPanel>
      <TabPanel value="search">World</TabPanel>
      <TabPanel value="notification">Notifications</TabPanel>
    </Tabs>
    <Button variant="outlined" icon={<HomeIcon />} />
  </>
);

export default App;
