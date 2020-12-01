export default {
  Menu: {
    English: [
      { title: `About Us`, src: `about`, component: `About`, lg: `en` },
      { title: `Cookies`, src: `cookies`, component: `Cookies`, lg: `en` },
      { title: `Pasties`, src: `pastries`, component: `Pastries`, lg: `en` },
      { title: `Cakes`, src: `cakes`, component: `Cakes`, lg: `en` },
      { title: `Sweets`, src: `sweets`, component: `Sweets`, lg: `en` },
      { title: `Contact`, src: `contact`, component: `Contact`, lg: `en` },
    ],
    Polish: [
      { title: `O nas`, src: `onas`, component: `About`, lg: `pl` },
      {
        title: `Ciasteczka`,
        src: `ciasteczka`,
        component: `Cookies`,
        lg: `pl`,
      },
      { title: `Ciasta`, src: `ciasta`, component: `Pastries`, lg: `pl` },
      { title: `Torty`, src: `torty`, component: `Cakes`, lg: `pl` },
      { title: `Cukierki`, src: `cukierki`, component: `Sweets`, lg: `pl` },
      { title: `Kontakt`, src: `kontakt`, component: `Contact`, lg: `pl` },
    ],
  },
  activeLanguage: `Polish`,
};
