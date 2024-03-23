'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollaboratorsSelect } from './collaborators';
import { SectionCreate } from './sections';

export default function Page() {
    const [collaboratorsData, setCollaboratorsData] = useState<{value: string, id: string}[]>([]);
    const [sectionsData, setSectionsData] = useState<{value: string, id: string}[]>([]);

    function handleCollaboratorsData(data: {value: string, id: string}[]) {
        setCollaboratorsData(data);
        console.log("Dados dos colaboradores atualizados:", data);
    }

    function handleSectionsData(data: {value: string, id: string}[]) {
        setSectionsData(data);
        console.log("Dados das seções atualizados:", data);
    }

    function handleCreateProject() {
        // Aqui você pode enviar os dados para onde precisar, por exemplo, para um backend
        console.log("Dados dos colaboradores:", collaboratorsData);
        console.log("Dados das seções:", sectionsData);
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 grid justify-center">
                <h1 style={{ fontSize: 45, color: '#121212' }}>Create your project</h1>
                <p style={{ color: '#4C4C4C', fontSize: 20 }} className="mb-10">Write the title of the sections you want to add.</p>
                <SectionCreate onSectionCreate={handleSectionsData} />
                <div className='mt-10'></div>
                <CollaboratorsSelect onCollaboratorsData={handleCollaboratorsData} />
                <Button className='mt-5' onClick={handleCreateProject}>Create</Button>
            </div>
        </div>
    );
}

