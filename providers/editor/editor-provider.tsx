"use client";
import { Editor, EditorElement, EditorProps, EditorState, HistoryState, PageDetails } from "@/types/pageEditor";
import { Dispatch, createContext, use, useContext, useEffect, useReducer } from "react";
import { EditorAction } from "./editor-actions";
import { it } from "node:test";

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {
        height: "100%",
        width: "100%",
        
      },
      type: "container",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
  },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (editorArray: EditorElement[], action: EditorAction): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT") {
    throw Error("You sent the wrong action type to the Add Element editor State");
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }
    return item;
  });
};

const updateAnElement = (editorArray: EditorElement[], action: EditorAction): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error("You sent the wron action type to the update Element State");
  }

  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      if (item.id === "__body") {
        const newobj = {
          ...item,
          styles: {
            ...item.styles,
            ...action.payload.elementDetails.styles,
          },
        };


        return newobj;
      }

      const updatedElement = {
        ...item,
        ...action.payload.elementDetails,
      };


      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {

      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }
    return item;
  });
};

const deleteAndElement = (editorArray: EditorElement[], action: EditorAction): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT") {
    throw Error("You sent the wrong action type to the Delete Element editor state");
  }
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAndElement(item.content, action);
    }
    return true;
  });
};

const editorReducer = (state: EditorState = initialState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };
      ///update the history to ionclude the entire updated EditorState
      const updatedHistory = [...state.history.history.slice(0, state.history.currentIndex + 1), { ...updatedEditorState }];
      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };
      return newEditorState;
    case "UPDATE_ELEMENT":
      // Perform your logic to update the element in the state
      const updatedElements = updateAnElement(state.editor.elements, action);

      const UpdatedElementIsSelected = state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate }, // Save a copy of the updated state
      ];
      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };

      return updatedEditor;

    case "DELETE_ELEMENT":
      ///perofmr your logic to delete the element from the state
      const updatedEelementsAfterDelete: EditorElement[] = deleteAndElement(state.editor.elements, action);
      const updatedEditorStateAfterDelete: Editor = {
        ...state.editor,
        elements: updatedEelementsAfterDelete,
      };

      const updatedHistoryAfterDelete: Editor[] = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ];

      const deleteState: EditorState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
      return deleteState;
    case "CHANGE_CLICKED_ELEMENT":
      const clickedState: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails ?? {
            id: "",
            content: [],
            name: "",
            styles: {},
            type: null,
          },
        },
        history: {
          ...state.history,
          history: [...state.history.history.slice(0, state.history.currentIndex + 1), { ...state.editor }],
          currentIndex: state.history.currentIndex + 1,
        },
      };
      return clickedState;
    case "CHANGE_DEVICE":
      return {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };
    case "TOGGLE_PREVIEW_MODE":
      return {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
    case "TOGGLE_LIVE_MODE":
      return {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload ? action.payload.value : !state.editor.liveMode,
        },
      };
    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = {
          ...state.history.history[nextIndex],
        };
        const redoState: EditorState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;

    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState: EditorState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;
    case "LOAD_DATA":
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements ?? initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      };

    default:
      return state;
  }
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  pageDetails: PageDetails | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  pageDetails: null,
});

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  useEffect(() => {
    console.log("state.editor.elements", state.editor.elements);
  }, [state.editor.elements]);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        pageDetails: props.pageDetails,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};
export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor hook must be used within the editor provider");
  }
  return context;
};

export default EditorProvider;
