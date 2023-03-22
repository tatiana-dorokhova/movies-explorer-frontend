import React, { useCallback } from 'react';

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
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm };
}
