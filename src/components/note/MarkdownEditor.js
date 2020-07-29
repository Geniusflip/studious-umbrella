import React from "react";
import Editor from "rich-markdown-editor";
import { internalLinkHandler } from "../../utils/internalLinkHandler";
import searchHandler from "../../utils/searchHandler";

const theme = {
	background: "#282c34",
	textSecondary: "#FFF" 
}

function MarkdownEditor({content, readOnly, notes, save, setSaveNote, setIdList, idList, offset, addNote}) {
	const search = searchHandler(notes);
	const clickHandler = internalLinkHandler(offset, setIdList, idList);
  return (
    <Editor
      autoFocus={true}
      defaultValue={content}
      value={content}
      dark={true}
      readOnly={readOnly}
      theme={theme}
      onSearchLink={search}
      onCreateLink={addNote}
      onClickLink={clickHandler}
      onChange={(value) => {setSaveNote(value())}}
      onSave={() => { save()}}
    />
  );
}

export default MarkdownEditor;
