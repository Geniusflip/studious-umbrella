import { scrollLeft } from './scrollHelper';
import { config } from '../config'


const clickHandler = (event, offset, setIdList, idList, link) => {
	if (event) {
    event.preventDefault();
  }
	const index = idList.findIndex(x => x === link);
	if (index !== -1) {
		setTimeout(() => scrollLeft(index + 1));
		return;
	}
  setIdList((ids) => {
    return [...ids.slice(0, offset + 1), link];
  });
  
  setTimeout(() => scrollLeft(offset + 1));
};


const internalLinkHandler = (offset, setIdList, idList) => {
	return (href) => {
		if (href.includes(config.internalUrlPrefix)) {
			clickHandler(
				undefined,
				offset,
				setIdList,
				idList,
				href.replace(href.split("/").reverse().slice(1).reverse().join('/'), "").replace("/", "")
			);
		} else {
			window.location.href = href;
		}
	}
}

export {
	internalLinkHandler,
	clickHandler,
}