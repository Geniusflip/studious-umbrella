const scrollLeft = (offset) => {
	window.scrollTo({
		left: offset * 580 - offset * 40 - 22,
		top: 0,
		behavior: "smooth",
	});
}

export {
    scrollLeft
}