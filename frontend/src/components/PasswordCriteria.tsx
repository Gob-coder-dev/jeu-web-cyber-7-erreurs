import "./PasswordCriteria.css";

type PasswordCriteriaProps = {
  password: string;
};

function PasswordCriteria({ password }: PasswordCriteriaProps) {
  const criteria = [
    {
      label: "Au moins 6 caractères",
      met: password.length >= 6,
    },
    {
      label: "Maximum 15 caractères",
      met: password.length <= 15,
    },
  ];

  return (
    <div className="password-criteria">
      <p className="password-criteria__title">Critères du mot de passe :</p>
      <ul className="password-criteria__list">
        {criteria.map((criterion, index) => (
          <li
            key={index}
            className={`password-criteria__item ${
              criterion.met
                ? "password-criteria__item--met"
                : "password-criteria__item--not-met"
            }`}
          >
            <span className="password-criteria__icon">
              {criterion.met ? "✓" : "✗"}
            </span>
            <span className="password-criteria__label">{criterion.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordCriteria;
