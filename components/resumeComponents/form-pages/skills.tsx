import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import useResumeStore from '@/context/resumeContext';

const Skills = () => {
  const resume = useResumeStore();
  const [newSkill, setNewSkill] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([
    'Programming Languages',
    'Frameworks/Libraries',
    'Databases',
    'Tools/DevOps',
    'Soft Skills',
  ]);
  const [groupedSkills, setGroupedSkills] = useState({});

  useEffect(() => {
    setGroupedSkills(groupSkillsByCategory(resume.skills));
  }, [resume.skills]);

  const groupSkillsByCategory = (skillsArray: { skill: string; category: string }[]) => {
    return skillsArray.reduce((acc, skillObj) => {
      const { category, skill } = skillObj;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as { [key: string]: string[] });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && newSkillCategory) {
      resume.addSkill({ skill: newSkill, category: newSkillCategory });
      setNewSkill('');
      setNewSkillCategory('');
    } else {
      console.warn("Please enter a skill and select a category.");
    }
  };

  const handleDeleteSkill = (category: string, skillToDelete: string) => {
    resume.deleteSkill({ skill: skillToDelete, category });
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.keys(groupedSkills).map((category) => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {groupedSkills[category]?.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button onClick={() => handleDeleteSkill(category, skill)} className="focus:outline-none">
                    <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-2 items-center">
          <Input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter new skill"
          />
          <Select value={newSkillCategory} onValueChange={setNewSkillCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {availableCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddSkill}>Add Skill</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;