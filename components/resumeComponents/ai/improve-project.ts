import generateGeminiResponse from "@/lib/prompt";

export const improveProjectWithAI = async (project: any) => {
    const prompt = `
  You are a resume writing assistant. Improve the following project entry for clarity, professionalism, and impact. Return the improved version as a JSON object with fields: projectName, description. Please keep the description short and use impactful, technical language to boost ATS score.
  
  Project:
  Project Name: ${project.projectName}
  Description: ${project.description}
  `;
  
    const output = await generateGeminiResponse(prompt);
  
    try {
      const jsonMatch = output.match(/```json([\s\S]*?)```/);
      const jsonContent = jsonMatch ? jsonMatch[1].trim() : output;
      const improved = JSON.parse(jsonContent);
      return improved;
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      return {};
    }
  };
  