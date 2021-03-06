import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { v4 } from "uuid";
import { clickHandler } from "../../utils/internalLinkHandler";
import TitleBar from './TitleBar'
import SideBar from './SideBar'
import MarkdownEditor from "./MarkdownEditor";
import closeSVG from "../../assets/close.svg";
import editSVG from "../../assets/edit.svg";
import saveSVG from "../../assets/save.svg";
import deleteSVG from "../../assets/delete.svg";
import externalSVG from "../../assets/external.svg";
import { config } from '../../config'

function Note({ docId, idList, setIdList, offset, notes, loggedIn }) {
  const [saveNote, setSaveNote] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [value] = useDocument(
    firebase.firestore().doc(`notes/${docId}`),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const content = value ? ((value.data() || {}).content || '').replace(new RegExp(config.saveUrlPrefix, 'g'), config.internalUrlPrefix) || "## New Note" : "";
  const save = () => {
    if (value) { value.ref.set({ content: saveNote.replace(new RegExp(config.internalUrlPrefix, 'g'), config.saveUrlPrefix) }); }
		setReadOnly(true);
  };
  const close = () => setIdList((list) => list.slice(0, offset));
  const addNote = async (title) => {
		const noteId = v4();
		const link = `${config.internalUrlPrefix}?n=${noteId}`
    value.ref.set({ content: saveNote + `\n[${title || 'New Note'}](${link})`});
		setIdList(idlist => [...idlist.slice(0, offset + 1), noteId]);
		return link;
	};
	const deleteNote = async () => {
		const result = window.confirm("Are you sure you want to delete this note?")
		if (result) {
			await value.ref.delete();
			close();
		}
	}
	useEffect(() => setSaveNote(content), [content]);
  const buttons = [
		{ label: closeSVG, clickFn: () => close(), conditional: offset},
		{ label: editSVG, clickFn: () => setReadOnly(false), conditional: loggedIn && readOnly},
		{ label: saveSVG, clickFn: () => save(), conditional: loggedIn && !readOnly},
		// { label: addSVG, clickFn: () => addNote() , conditional: true},
		{ label: deleteSVG, clickFn: () => deleteNote() , conditional: loggedIn && offset },
		{ label: externalSVG, clickFn: () => window.location.href = `${window.location.origin}/?n=${docId}`, conditional: true },
	];

  const showBar = window.scrollX >= offset * 580;
  const showShadow =
    window.scrollX > 0 &&
    window.scrollX >= (offset - 1) * 600 - offset * 40 &&
    window.scrollX <= offset * 580 &&
		!showBar;
	const links = (content.split(`${config.internalUrlPrefix}/?n=`) || []).slice(1);
  return (
    <div className="Note" style={{}}>
      <div className={`container ${showShadow ? "floating" : ""}`}>
        <TitleBar noteOffset={offset} content={content}></TitleBar>
        <div className="content" style={{ left: offset * 40 + 20 }}>
          <div className="editor-container">
						<MarkdownEditor
							notes={notes}
							content={content}
							addNote={addNote}
							readOnly={readOnly}
							save={save}
							setSaveNote={setSaveNote}
							setIdList={setIdList}
							idList={idList}
							offset={offset}
						></MarkdownEditor>
				{ !!links.length && links
					.some(x => notes.find(note => note.id === x.split(')')[0])) && <div className="links">
					{!!links.length && <h3 className="links-title">Links to this note</h3>}
					{links
						.map(x => {
							const id = x.split(')')[0];
							const card = notes.find(note => note.id === id);
							if (!card) { return null; }
							const content = card.data().content;
							return (
								<div key={x} onClick={(event) => clickHandler(event, offset, setIdList, idList, id)} className="card">
									<div key={`${x}-title`} className="card-title">
										{(content.split("\n")[0] || "").replace(/[^\w\s-]*/, "").slice(0, 50)}
									</div>
									<div key={`${x}-content`} className="card-content">
										{(content.split("\n").filter(x => x)[1] || "").replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, '$1').replace('\\', '').slice(0, 250)}
									</div>
								</div>
							);
						})
					}
					</div>
				}
				</div>
				<SideBar buttons={buttons}></SideBar>
        </div>
        {!!idList[offset + 1] && (
          <Note
            key={offset + 1}
            docId={idList[offset + 1]}
            idList={idList}
            setIdList={setIdList}
						offset={offset + 1}
						notes={notes}
						loggedIn={loggedIn}
          ></Note>
        )}
      </div>
    </div>
  );
}

export default Note;
