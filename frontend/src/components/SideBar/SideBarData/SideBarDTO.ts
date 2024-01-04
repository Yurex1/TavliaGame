type SideBarConfig = {
  text: string;
  hrefText: string;
  img_url: string;
};

type SideBarDTO = {
    Title: string;
    Config: SideBarConfig[];
    Login: string;
    Logout: string;
}

export default SideBarDTO;