import React, { PropsWithChildren, FunctionComponent, MouseEventHandler, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BucketIcon } from "../icons/bucket";
import { MenuIcon } from "../icons/menu";
import { StyledRemoveButton, StyledItem, StyledList, StyledTitle, StyledIcon } from "./track-breakdown.styled";

export const TRACK_BREAKDOWN_TEST_ID = "track-breakdown";
export const TRACK_BREAKDOWN_ITEM_TEST_ID = "track-breakdown-item";
export const TRACK_WAYPOINT_TEST_ID = "track-waypoint";
export const TRACK_WAYPOINT_REMOVE_TEXT = "Remove Waypoint";

export type TrackWaypointProps = PropsWithChildren<{
  index: number;
  onRemove?: MouseEventHandler;
  onSort?: (dragIndex: number, hoverIndex: number) => void;
}>;

export const ItemType = "WAYPOINT";

export type DragItem = {
  index: number;
};

export const TrackWaypoint: FunctionComponent<TrackWaypointProps> = ({ children, index, onRemove, onSort }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, dragRef] = useDrag<DragItem>({
    item: { index },
    type: ItemType,
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    drop: (item: DragItem) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      onSort?.(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <StyledItem ref={ref} data-test-id={TRACK_BREAKDOWN_ITEM_TEST_ID}>
      <StyledIcon data-test-id={TRACK_WAYPOINT_TEST_ID}>
        <MenuIcon />
      </StyledIcon>
      <StyledTitle>{children}</StyledTitle>
      <StyledRemoveButton onClick={onRemove}>
        <StyledIcon>
          <BucketIcon />
        </StyledIcon>
        {TRACK_WAYPOINT_REMOVE_TEXT}
      </StyledRemoveButton>
    </StyledItem>
  );
};

export type TrackBreakdownProps = PropsWithChildren<unknown>;

export const TrackBreakdown: FunctionComponent<TrackBreakdownProps> = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledList data-test-id={TRACK_BREAKDOWN_TEST_ID}>{children}</StyledList>
    </DndProvider>
  );
};
