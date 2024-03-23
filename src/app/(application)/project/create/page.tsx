'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollaboratorsSelect } from './collaborators';
import { SectionCreate } from './sections';
import { ProjectInfos } from './form';

export default function Page() {
    const [formData, setFormData] = useState<{
        project: { title: string, abstract: string },
        collaborators: { value: string, id: string }[],
        sections: { value: string, id: string }[]
    }>({
        project: { title: "", abstract: "" },
        collaborators: [],
        sections: []
    });

    function handleProjectInfos(data: { title: string, abstract: string }) {
        setFormData(prevData => ({
            ...prevData,
            project: data
        }));
    }

    function handleCollaboratorsData(data: { value: string, id: string }[]) {
        setFormData(prevData => ({
            ...prevData,
            collaborators: data
        }));
    }

    function handleSectionsData(data: { value: string, id: string }[]) {
        setFormData(prevData => ({
            ...prevData,
            sections: data
        }));
    }

    function handleCreateProject() {
        if (formData.project.title && formData.collaborators.length > 0 && formData.sections.length > 0) {
            // Tito trabalha
            console.log("Dados do projeto:", formData);
        } else {
            console.error("Erro: Dados incompletos.");
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
