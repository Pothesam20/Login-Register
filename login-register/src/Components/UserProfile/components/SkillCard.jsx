import { useState, useEffect } from 'react';
import './SkillCard.css';

const SkillCard = ({ title, skills }) => {
  const [animatedSkills, setAnimatedSkills] = useState(
    skills.map(skill => ({ ...skill, currentPercentage: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills.map(skill => ({ ...skill, currentPercentage: skill.percentage })));
    }, 100);

    return () => clearTimeout(timer);
  }, [skills]);

  return (
    <div className="skill-card">
      <h3 className="card-title editable">{title}</h3>
      <div className="skills-list">
        {animatedSkills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.percentage}%</span>
            </div>
            <div className="skill-progress-bar">
              <div 
                className="skill-progress-fill"
                style={{ 
                  width: `${skill.currentPercentage}%`,
                  transition: 'width 1s ease-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
