type Table = {
    White: string;
    Black: string;
    Moveing: string;
    WhiteWin: string;
    BlackWin: string;
    GameHistory: string;
    RestartGame: string;
}

type GameData = {
    GetRoomId: string;
    RoomId: string;
    Back: string;
    CreateRoom: string;
    JoinRoom: string;
    Table: Table;
}

export default GameData;