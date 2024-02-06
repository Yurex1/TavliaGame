type IGameListItemProps = {
    id: string;
    color: string;
    status: string;
  };
  
  const GameListItem = ({ id, color, status }: IGameListItemProps) => {
    return (
      <div key={id} className="game-list-item">
        <div className="game-id">{id}</div>
        <div className="game-color">{color}</div>
        <div className="game-status">{status}</div>
      </div>
    );
  };
  
  export default GameListItem;
  