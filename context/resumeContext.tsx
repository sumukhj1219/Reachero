import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

interface EducationDetails {
  degree: string;
  school: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  cgpa: string;
}

interface Skill{
  skill:string
  category:string
}

interface ResumeState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  skills:Skill[];
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
  addSkill:(newSkill:Skill)=>void;
  deleteSkill:(skillToDelete:Skill)=>void;
}

const initialEducationDetails: EducationDetails[] = [];

const useResumeStore = create<ResumeState>()(
  devtools(
    persist(
      (set) => ({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        educationDetails: initialEducationDetails,
        skills:[],
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
      }),
      {
        name: 'resume-storage',
      }
    )
  )
);

export default useResumeStore;