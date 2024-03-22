"use client"

import { SectionCreate } from './sections';
import { CollaboratorsSelect } from './collaborators';

export default function Page(){
    // const [titleValue, setTitleValue] = useState('');

    return(
        <div className="flex justify-center">
            <div className="w-1/2">
                <h1 style={{fontSize: 45, color: '#121212'}}> Create your project</h1>
                <p style={{color: '#4C4C4C', fontSize:20}} className="mb-10">Write the title of the sections you want to add.</p>
                <SectionCreate />
                <div className='mt-10'></div>
                <CollaboratorsSelect />
            </div>
        </div>
    )
}
