type IFriendListItemProps = {
  name: string;
  id: string;
  rating: number;
};

const FriendListItem = ({ id, name, rating }: IFriendListItemProps) => {
  return (
    <div key={id} className="friend-list-item">
      <div className="friend-id">{id}</div>
      <div className="friend-name">{name}</div>
      <div className="friend-rating">{rating}</div>
    </div>
  );
};

export default FriendListItem;
