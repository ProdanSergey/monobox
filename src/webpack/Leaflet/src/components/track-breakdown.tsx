import React, { PropsWithChildren, FunctionComponent, MouseEventHandler } from "react";
import { BucketIcon } from "../icons/bucket";
import { MenuIcon } from "../icons/menu";
import { StyledRemoveButton, StyledItem, StyledList, StyledTitle, StyledIcon } from "./track-breakdown.styled";

export const TRACK_BREAKDOWN_TEST_ID = "track-breakdown";
export const TRACK_WAYPOINT_TEST_ID = "track-waypoint";
export const TRACK_WAYPOINT_REMOVE_TEXT = "Remove Waypoint";

export type TrackWaypointProps = PropsWithChildren<{
  onRemove?: MouseEventHandler;
}>;

export const TrackWaypoint: FunctionComponent<TrackWaypointProps> = ({ children, onRemove }) => {
  return (
    <StyledItem>
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
  return <StyledList data-test-id={TRACK_BREAKDOWN_TEST_ID}>{children}</StyledList>;
};
