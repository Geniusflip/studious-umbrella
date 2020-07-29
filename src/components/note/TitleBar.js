import React from "react";
import { scrollLeft } from '../../utils/scrollHelper';

function TopBar ({noteOffset, content}) {
	const showBar = window.scrollX >= noteOffset * 580;
	const title = (content.split("\n")[0] || "").replace(/[^\w\s-]*/, "").slice(0, 50)
	return (
		<div
				className="bar"
				style={{ left: noteOffset * 40, opacity: showBar ? "1" : "0" }}
				onClick={() => scrollLeft(noteOffset)}
		>
				{title}
		</div>
	)
}

export default TopBar;