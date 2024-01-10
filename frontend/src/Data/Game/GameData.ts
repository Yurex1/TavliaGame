type Table = {
    White: string;
    Black: string;
    Moveing: string;
    WhiteWin: string;
    BlackWin: string;
    GameHistory: string;
    RestartGame: string;
}

type OnlineTable = {
    Win: string;
    Surendered: string;
    Moving : string;
    White: string;
    Black: string;
    GameHistory: string;
    Surrender: string;
}

type GameData = {
    GetRoomId: string;
    RoomId: string;
    Back: string;
    CreateRoom: string;
    JoinRoom: string;
    Table: Table;
    OnlineTable: OnlineTable;
    Loading: string;
    PleaseLogin: string;
}

export default GameData;