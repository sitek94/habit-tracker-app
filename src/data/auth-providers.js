// import { Apple as AppleIcon } from "mdi-material-ui";
import { Facebook as FacebookIcon } from "mdi-material-ui";
import { Github as GitHubIcon } from "mdi-material-ui";
import { Google as GoogleIcon } from "mdi-material-ui";
// import { Microsoft as MicrosoftIcon } from "mdi-material-ui";
// import { Twitter as TwitterIcon } from "mdi-material-ui";
// import { Yahoo as YahooIcon } from "mdi-material-ui";

/**
 * I created all the color objects using Material Design Color Tool
 * 
 * https://material.io/resources/color/#!/
 */
const authProviders = [
  // {
  //   id: "apple.com",
  //   color: "#000000",
  //   icon: <AppleIcon />,
  //   name: "Apple",
  // },
  {
    id: "facebook.com",
    color: {
      main: '#3c5a99',
      light: '#6e87ca',
      dark: '#00316a',
    },
    icon: <FacebookIcon />,
    name: "Facebook",
  },
  {
    id: "github.com",
    color: {
      main: '#24292e',
      light: '#4c5157',
      dark: '#000004',
    },
    icon: <GitHubIcon />,
    name: "GitHub",
    // scopes: ["repo"],
  },
  {
    id: "google.com",
    color: {
      main: '#de5246',
      light: '#ff8472',
      dark: '#a61c1e',
    },
    icon: <GoogleIcon />,
    name: "Google",
  },
  // {
  //   id: "microsoft.com",
  //   color: "#f65314",
  //   icon: <MicrosoftIcon />,
  //   name: "Microsoft",
  // },
  // {
  //   id: "twitter.com",
  //   color: "#1da1f2",
  //   icon: <TwitterIcon />,
  //   name: "Twitter",
  // },
  // {
  //   id: "yahoo.com",
  //   color: "#410093",
  //   icon: <YahooIcon />,
  //   name: "Yahoo",
  // },
];

export default authProviders;
