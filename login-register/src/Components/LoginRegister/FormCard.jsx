import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormCard = ({ 
  title, 
  children, 
  onSubmit, 
  submitText = "Submit",
  className = "" 
}) => {
  return (
    <div className={`form-card ${className}`}>
      <div className="form-header">
        <h2>{title}</h2>
      </div>
      <form onSubmit={onSubmit} className="form-content">
        {children}
        <button type="submit" className="submit-btn">
          {submitText}
        </button>
      </form>
    </div>
  );
};

const FormField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error, 
  showPassword, 
  onTogglePassword,
  maxLength,
  className = "",
  pattern,
  inputMode
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="field-label">{label}</label>
      <div className="input-container">
        {Icon && <Icon className="input-icon" />}
        <input
          id={name}
          type={showPassword !== undefined ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          className={`form-input ${error ? 'error' : ''}`}
        />
        {onTogglePassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={onTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  placeholder,
  error,
  className = ""
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="field-label">{label}</label>
      <div className="input-container">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-select ${error ? 'error' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

const DefaultSecurityQuestions = ({ 
  questions, 
  answers, 
  onChange, 
  errors = {} 
}) => {
  const defaultQuestions = [
    "What is your favorite color?",
    "What is your pet name?",
    "Where were you born?",
    "What is your mother's maiden name?",
    "What was your first car?",
    "What is your favorite movie?"
  ];

  const getAvailableQuestions = (currentQuestionIndex) => {
    const selectedQuestions = [
      questions.securityQuestion1,
      questions.securityQuestion2
    ];
    
    return defaultQuestions.filter((question, index) => {
      const isCurrentQuestion = currentQuestionIndex === 1 ? 
        question === questions.securityQuestion1 : 
        question === questions.securityQuestion2;
      
      return isCurrentQuestion || !selectedQuestions.includes(question);
    });
  };

  return (
    <div className="security-questions-section">
      <h3 className="security-title">Security Questions</h3>
      
      <div className="security-row">
        <SelectField
          label="Question 1"
          name="securityQuestion1"
          value={questions.securityQuestion1}
          onChange={onChange}
          options={getAvailableQuestions(1)}
          placeholder="Select a security question"
          error={errors.securityQuestion1}
          className="question-select"
        />
        <FormField
          label="Answer 1"
          name="securityAnswer1"
          value={answers.securityAnswer1}
          onChange={onChange}
          placeholder="Enter your answer"
          error={errors.securityAnswer1}
          className="answer-input-field"
        />
      </div>

      <div className="security-row">
        <SelectField
          label="Question 2"
          name="securityQuestion2"
          value={questions.securityQuestion2}
          onChange={onChange}
          options={getAvailableQuestions(2)}
          placeholder="Select a security question"
          error={errors.securityQuestion2}
          className="question-select"
        />
        <FormField
          label="Answer 2"
          name="securityAnswer2"
          value={answers.securityAnswer2}
          onChange={onChange}
          placeholder="Enter your answer"
          error={errors.securityAnswer2}
          className="answer-input-field"
        />
      </div>
    </div>
  );
};

export { FormCard, FormField, SelectField, DefaultSecurityQuestions };