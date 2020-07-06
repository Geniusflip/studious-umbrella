import React, {useState} from 'react';
import Editor from 'rich-markdown-editor';

const d = {
	1: `## System design notes 
Outline use cases, assumptions, and constraints.
[Link to note](internal-4)
How to approach a system design question.`,
	2: `* Who is going to use it?
	* How are they going to use it?
	* How many users are there?
	* What does the system do?
	[Link to something](internal-3)`,
	3: `## Types of consistency 
[Link to another note](internal-1)
- Weak consistency - Maybe reads will read a write - real time games
- Eventual consistency - Reads will eventually see `,
	4:`Availability in parallel vs sequence
If a service consists of multiple components prone to failure , the services overall availability depends on whether the components are in sequence or in parallel. In sequence A*B. 
Availability increases when two services with <100% availability are in parallel. 
[link](internal-2)
1 - ( 1- A ) * (1 -B)
	`
}
const clickHandler = (event, offset, setNotes, link) => {
	console.log(link);
	setNotes((notes) => {
		const note = d[link] || d[1];
		return [...notes.slice(0, offset + 1), note];
	});
	if (event) {event.preventDefault();}
	setTimeout(() => window.scrollTo({
		left: (offset + 1) * 580 - (offset + 1) * 40 - 22,
		top: 0,
		behavior:'smooth',
	}));
}
function Note({data, rest, offset, setNotes, readOnly, setReadOnly}) {
	const showBar = window.scrollX >= (offset * 580);
	const showShadow = window.scrollX > 0 && window.scrollX >= ((offset - 1) * 600 - (offset) * 40) && window.scrollX <= (offset) * 580 && !showBar;
	return (
		<div className="Note" style={{}}>   
			<div className='container' style={{	
				boxShadow: showShadow? 'rgba(108, 108, 108, 0.41) 1px 2px 10px 3px' : 'none'
			}}>
				<div 
					className='bar' 
					style={{ left: (offset) * 40, opacity: showBar ? '1' : '0' }}
					onClick={()=>{
						window.scrollTo({
							left:((offset * 580) - (offset) * 40) - 22, 
							top: 0,
							behavior: 'smooth',
						});
					}}
				>
					{ (data.split('\n')[0] || '').replace(/[^\w\s-]*/, "").slice(0, 256)}
				</div>
				<div className='content' style={{
					left: (offset * 40) + 20,
				}}>
					<Editor
						defaultValue={data}
						dark={true}
						readOnly={readOnly}
						theme={{background: '#282c34', textSecondary: '#FFF'}}
						onSearchLink={ async searchTerm => {
							const results = Object.values(d).filter(note => note.includes(searchTerm));
						
							return results.map(result => ({
								title: result.slice(0, 30),
								url: `internal-0`,
							}));
						}}
						onClickLink={href => {
							if (href.includes('internal-')) {
								clickHandler(undefined, offset, setNotes, href.replace(`${window.location.origin}/`,"").replace('internal-',''))
							} else {
								window.location.href = href;
							}
						  }}
					/>
				</div>
				{rest.length ? 
					<Note key={offset + 1} 
						rest={rest.slice(1, rest.length)}
						data={rest[0]} offset={offset + 1}
						setNotes={setNotes}
						readOnly={readOnly}
						setReadOnly={setReadOnly}
					>	
					</Note> 
			: ''}
			</div>
		</div>
	);
}

export default Note;
