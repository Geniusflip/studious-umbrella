import React from "react";

function SideBar({buttons}) {
	return (
		<div className="sidebar">
			{(buttons || [])
				.filter(x => x.conditional)
				.map((x, key) => <img className="button" key={key} onClick={x.clickFn} src={x.label} alt={x.label}></img>)}
		</div>
	)
}

export default SideBar
