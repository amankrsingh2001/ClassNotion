import SectionHeader from "../../ui/SectionHeader";

function LearningLanguage() {
  return (
    <SectionHeader
      center
      eyebrow="Your toolkit"
      title={
        <>
          Everything you need to <span className="text-gradient">keep momentum</span>
        </>
      }
      subtitle="Progress tracking, schedules and peer comparisons — designed to make learning a daily habit."
    />
  );
}

export default LearningLanguage;
