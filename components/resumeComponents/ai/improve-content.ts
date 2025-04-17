import generateGeminiResponse from "@/lib/prompt";

export const improveContentWithAI = async (experience: any) => {
  const prompt = `
You are a resume writing assistant. Improve the following experience entry for clarity, professionalism, and impact. Return the improved version as a JSON object with fields: company, position, description please keep description short use key words to enhance ATS score.

Experience:
Company: ${experience.company}
Position: ${experience.position}
Description: ${experience.description}
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
