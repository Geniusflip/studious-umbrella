import React, {useEffect, useState} from 'react';
import './App.css';
import Note from './Note';

const data = [
`## System design notes 
Outline use cases, assumptions, and constraints.

How to approach a system design question.

* Who is going to use it?
* How are they going to use it?
* How many users are there?
* What does the system do?
* What are the inputs and outputs of the system?
* How much data do we expect to handle?
* How many requests per second do we expect?
* What is the expected read to write ratio?

A service is scalable if it results in increased performance in a manner proportional to resources allocated.`,
`## Types of consistency 

- Weak consistency - Maybe reads will read a write - real time games
- Eventual consistency - Reads will eventually see it - i.e email
- Strong consistency - Reads will see writes - .i.e Filesystem. Works well with transactions.
`,
`## Types of Availability

Fail over:

	- Active-passive 
		A heartbeat is sent between an active and passive server, when the heartbeat stops, the passive starts. Only the active server handles traffic. Downtime is determined by hot or cold state of the passive server.
	- Active-active
		Both servers are handling traffic, load balanced between the two. DNS needs to know about both.
	Disadvantages
		- More hardware, additional complexity.
		- Potential loss of data.
`,
`## Availability in numbers:
Availability is often quantified by uptime as a percentage of when the service is available, generally measured in 9’s

99.9% - 8h per year of down time, 99.99% 60 minutes of downtime.

Availability in parallel vs sequence
If a service consists of multiple components prone to failure , the services overall availability depends on whether the components are in sequence or in parallel. In sequence A*B. 
Availability increases when two services with <100% availability are in parallel. 
1 - ( 1- A ) * (1 -B)
`,
`## Borg White-paper

Large-scale cluster management at Google with Borg

- Cluster manager
- Hundreds of thousands of jobs.

Achieves high utilisation by combining
- Admission control
- Efficient task-packing
- Over-commitment,
- And machine sharing with process level performance isolation.

Supports high availability application, and mimnimises fault recovers time.

Offers a declarative job specification, name service integration, real time job monitoring, and analysis tools.

Provides three main benefits
    1. Hides the details of resource management and failure handling so its users can focus on application dev - separation of concerns.
    2. High reliability and availability. — Ding Ding Ding — consistency ? (CAP theorem)
	 3. Efficiently distributed.



Users submit their work to Borg in the forms of jobs - consisting of on or more tasks. Each job runs in one Borg cell (pod) `
,`## System design notes 
Outline use cases, assumptions, and constraints.

How to approach a system design question.

* Who is going to use it?
* How are they going to use it?
* How many users are there?
* What does the system do?
* What are the inputs and outputs of the system?
* How much data do we expect to handle?
* How many requests per second do we expect?
* What is the expected read to write ratio?

A service is scalable if it results in increased performance in a manner proportional to resources allocated.`,
`## Types of consistency 

- Weak consistency - Maybe reads will read a write - real time games
- Eventual consistency - Reads will eventually see it - i.e email
- Strong consistency - Reads will see writes - .i.e Filesystem. Works well with transactions.
`,
`## Types of Availability

Fail over:

	- Active-passive 
		A heartbeat is sent between an active and passive server, when the heartbeat stops, the passive starts. Only the active server handles traffic. Downtime is determined by hot or cold state of the passive server.
	- Active-active
		Both servers are handling traffic, load balanced between the two. DNS needs to know about both.
	Disadvantages
		- More hardware, additional complexity.
		- Potential loss of data.
`,
`## Availability in numbers:
Availability is often quantified by uptime as a percentage of when the service is available, generally measured in 9’s

99.9% - 8h per year of down time, 99.99% 60 minutes of downtime.

Availability in parallel vs sequence
If a service consists of multiple components prone to failure , the services overall availability depends on whether the components are in sequence or in parallel. In sequence A*B. 
Availability increases when two services with <100% availability are in parallel. 
1 - ( 1- A ) * (1 -B)
`,
`## Borg White-paper

Large-scale cluster management at Google with Borg

- Cluster manager
- Hundreds of thousands of jobs.

Achieves high utilisation by combining
- Admission control
- Efficient task-packing
- Over-commitment,
- And machine sharing with process level performance isolation.

Supports high availability application, and mimnimises fault recovers time.

Offers a declarative job specification, name service integration, real time job monitoring, and analysis tools.

Provides three main benefits
    1. Hides the details of resource management and failure handling so its users can focus on application dev - separation of concerns.
    2. High reliability and availability. — Ding Ding Ding — consistency ? (CAP theorem)
	 3. Efficiently distributed.



Users submit their work to Borg in the forms of jobs - consisting of on or more tasks. Each job runs in one Borg cell (pod) `

  
]
function App() {
	const [scrollX, setScrollX] = useState(0)
	useEffect(() => {
		const handleScroll = () => {
			setScrollX(window.scrollX);
		}
		window.addEventListener('scroll', handleScroll);
	}, [])
  return (
    <div className="App">
      {data.map((val, i) => <Note key={i} data={val} offset={i}></Note>)}
    </div>
  );
}

export default App;
