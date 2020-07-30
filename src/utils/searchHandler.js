import { config } from '../config'

const searchHandler = (notes) => {
	return async (searchTerm) => {
		if (!notes.length) return [];
		const results = Object.values(notes).filter((note) =>
			note.data().content.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return results.map((result) => ({
			title: (result.data().content.split("\n")[0] || "")
				.replace(/[^\w\s-]*/, "")
				.slice(0, 256)
				.trimStart(),
			url: `${config.saveUrlPrefex}/${result.id}`,
		}));
	}
}

export default searchHandler;