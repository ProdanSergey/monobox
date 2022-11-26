import { FunctionComponent } from "react";
import { TrelloList } from "../../domain";
import { TrelloBoardList } from "./list.component";

type TrelloBoardProps = {
  lists: TrelloList[];
  selected?: TrelloList;
  onSelect?: (id: TrelloList) => void;
};

export const TrelloBoard: FunctionComponent<TrelloBoardProps> = ({ lists, selected, onSelect }) => {
  return (
    <div>
      <p>Trello Board</p>
      {lists.length ? (
        <ul>
          {lists.map((list) => (
            <TrelloBoardList key={list.id} list={list} highlighted={selected?.id === list.id} onClick={onSelect} />
          ))}
        </ul>
      ) : (
        <p>Empty Board</p>
      )}
    </div>
  );
};
