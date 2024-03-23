"use client"

import { SectionCreate } from './sections';
import { CollaboratorsSelect } from './collaborators';
import {Button} from '@/components/ui/button'
import { useState } from 'react';

export default function Page(){
    const [collaboratorsData, setCollaboratorsData] = useState<{value: string, id: string}[]>([]);

    function handleCollaboratorsData(data:{value: string, id: string}[]) {
        setCollaboratorsData(data);
        console.log("Dados dos colaboradores atualizados:", data);
    }
    return(
        <div className="flex justify-center">
            <div className="w-1/2 grid justify-center">
                <h1 style={{fontSize: 45, color: '#121212'}}> Create your project</h1>
                <p style={{color: '#4C4C4C', fontSize:20}} className="mb-10">Write the title of the sections you want to add.</p>
                <SectionCreate />
                <div className='mt-10'></div>
                <CollaboratorsSelect onCollaboratorsData={handleCollaboratorsData} />
                <Button className='mt-5'>Create</Button>
            </div>
        </div>
    )
}
