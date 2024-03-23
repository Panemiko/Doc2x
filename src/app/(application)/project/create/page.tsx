'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollaboratorsSelect } from './collaborators';
import { SectionCreate } from './sections';
import { ProjectInfos } from './form';

export default function Page() {
    const [collaboratorsData, setCollaboratorsData] = useState<{value: string, id: string}[]>([]);
    const [sectionsData, setSectionsData] = useState<{value: string, id: string}[]>([]);
    const [projectData, setProjectData] = useState<{ title: string, abstract: string } | null>(null);

    function handleCollaboratorsData(data: {value: string, id: string}[]) {
        setCollaboratorsData(data);
        console.log("Dados dos colaboradores atualizados:", data);
    }

    function handleSectionsData(data: {value: string, id: string}[]) {
        setSectionsData(data);
        console.log("Dados das seções atualizados:", data);
    }

    function handleProjectInfos(data: { title: string, abstract: string }) {
        setProjectData(data);
    }

    function handleSubmitProject() {
        const form = document.getElementById("project-form") as HTMLFormElement;
        if (form) {
            form.dispatchEvent(new Event("submit"));
        }
    }

    function handleCreateProject() {
        console.log("Dados dos colaboradores:", collaboratorsData);
        console.log("Dados das seções:", sectionsData);
        handleSubmitProject();
        if (projectData) {
            console.log("Dados Básicos:", projectData);
        } else {
            console.error("Erro: Dados do projeto não foram fornecidos.");
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-1/2 grid justify-center">
                <h1 style={{ fontSize: 45, color: '#121212' }}>Create your project</h1>
                <ProjectInfos onProjectInfos={handleProjectInfos} />
                <SectionCreate onSectionCreate={handleSectionsData} />
                <div className='mt-10'></div>
                <CollaboratorsSelect onCollaboratorsData={handleCollaboratorsData} />
                <Button className='mt-5' onClick={handleCreateProject}>Create</Button>
            </div>
        </div>
    );
}
