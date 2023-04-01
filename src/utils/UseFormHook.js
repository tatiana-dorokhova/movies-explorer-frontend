import React from 'react';
// используем тот же валидатор, что и на бэке
import { isEmail } from 'validator';

//хук управления формой и валидации формы
export function useFormWithValidation(defaultValues) {
  // массив значений полей формы
  const [values, setValues] = React.useState(defaultValues);
  // массив ошибок полей формы
  const [errors, setErrors] = React.useState({});
  // состояние валидности всей формы
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    // если изменилось поле email, то если оно не соответствует шаблону, дизейблить форму
    if (name === 'email' && !isEmail(value)) {
      console.log('name = ', name, 'isEmail(value) = ', isEmail(value));
      setErrors({ ...errors, email: 'email format is incorrect' });
      setIsValid(false);
    } else {
      console.log('name = ', name, 'isEmail(value) = ', isEmail(value));

      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
    }
  };

  return { values, handleChange, errors, isValid };
}
