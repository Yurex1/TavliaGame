type SideBarConfig = {
    text: string;
    hrefText: string;
    img_url: string;
};

type SideBarData = {
    Title: string;
    Config: SideBarConfig[];
    Login: string;
    Logout: string;
    Language: string;
}

export default SideBarData;