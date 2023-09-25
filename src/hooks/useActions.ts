import { useAppDispatch } from "../store/hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { chatActions } from "../store/Chat/Chat.slice";

const AllActions = {
  ...chatActions,
};

const useActions = () => {
  const dispatch = useAppDispatch();

  return { ...bindActionCreators(AllActions, dispatch) };
};

export default useActions;
