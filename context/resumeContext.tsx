import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

interface EducationDetails {
    degree: string;
    school: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    cgpa: string;
}

interface ExperienceDetails {
    id: string; // Add an ID to identify each experience entry
    company: string;
    position: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    description: string;
}

interface Skill {
    skill: string;
    category: string;
}

interface ResumeState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    experienceDetails: ExperienceDetails[];
    addEmptyExperience: () => void; // Function to add a new empty experience
    addExperience: (experience: Omit<ExperienceDetails, 'id'>) => void; // Function to add a pre-formed experience
    removeExperience: (idToRemove: string) => void;
    updateExperience: (id: string, updates: Partial<ExperienceDetails>) => void; // Modified update function
    skills: Skill[];
    educationDetails: EducationDetails[];
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    setCity: (city: string) => void;
    setState: (state: string) => void;
    setCountry: (country: string) => void;
    updateProfile: () => void;
    setEducationDetails: (details: EducationDetails[]) => void;
    addSkill: (newSkill: Skill) => void;
    deleteSkill: (skillToDelete: Skill) => void;
}

const initialEducationDetails: EducationDetails[] = [];
const initialExperienceDetails: ExperienceDetails[] = [];

const useResumeStore = create<ResumeState>()(
    devtools(
        persist(
            (set, get) => ({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                city: "",
                state: "",
                country: "",
                educationDetails: initialEducationDetails,
                skills: [],
                setFirstName: (firstName) => set({ firstName }),
                setLastName: (lastName) => set({ lastName }),
                setEmail: (email) => set({ email }),
                setPhone: (phone) => set({ phone }),
                setCity: (city) => set({ city }),
                setState: (newState) => set({ state: newState }),
                setCountry: (country) => set({ country }),
                updateProfile: () => set((state) => ({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone: state.phone,
                    city: state.city,
                    state: state.state,
                    country: state.country,
                })),
                setEducationDetails: (details) => set({ educationDetails: details }),
                addSkill: (newSkill) => set((state) => ({ skills: [...state.skills, newSkill] })),
                deleteSkill: (skillToDelete) => set((state) => ({
                    skills: state.skills.filter(
                        (skill) => !(skill.skill === skillToDelete.skill && skill.category === skillToDelete.category)
                    ),
                })),
                experienceDetails: initialExperienceDetails,
                addEmptyExperience: () => set((state) => ({
                    experienceDetails: [
                        ...state.experienceDetails,
                        { id: crypto.randomUUID(), company: "", position: "", startDate: undefined, endDate: undefined, description: "" },
                    ],
                })),
                addExperience: (experience) => set((state) => ({
                    experienceDetails: [
                        ...state.experienceDetails,
                        { id: crypto.randomUUID(), ...experience },
                    ],
                })),
                removeExperience: (idToRemove: string) => set((state) => ({
                    experienceDetails: state.experienceDetails.filter((exp) => exp.id !== idToRemove),
                })),
                updateExperience: (id: string, updates: Partial<ExperienceDetails>) =>
                    set((state) => ({
                        experienceDetails: state.experienceDetails.map((exp) =>
                            exp.id === id ? { ...exp, ...updates } : exp
                        ),
                    })),
            }),
            {
                name: 'resume-storage',
            }
        )
    )
);

export default useResumeStore;

