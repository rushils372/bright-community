import { useState } from 'react'

const filterList = ['all', 'mine', 'science', 'biology', 'commerce', 'public-services','miscellaneous']

export default function ProjectFilter({ changeFilter }) {
    const [currentFilter, setCurrentFilter] = useState('all')

    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Advice by: </p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >{f}</button>
                ))}
            </nav>
        </div>
    )
}