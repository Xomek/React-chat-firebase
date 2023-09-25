import { useAppDispatch } from "../store/hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { channelsActions } from "../store/Channels/Channels.slice";
import { messagesActions } from "../store/Messages/Messages.slice";

const AllActions = {
  ...channelsActions,
  ...messagesActions,
};

const useActions = () => {
  const dispatch = useAppDispatch();

  return { ...bindActionCreators(AllActions, dispatch) };
};

export default useActions;
