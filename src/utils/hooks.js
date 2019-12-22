import { set } from 'lodash';
import { useEffect, useState } from 'react';


export const useForm = (callback, validator, initialValues = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Object.keys(errors).length === 0 && isSubmitting && callback(values);
  }, [errors]); // eslint-disable-line

  const handleSubmit = (event) => {
    event && event.preventDefault();
    setErrors(validator ? validator(values) : {});
    setIsSubmitting(true);
  };

  const handleChange = (name, value) => {
    const newValues = ({ ...set(values, name, value) });
    setValues(values => ({ ...set(values, name, value) }));
    const newErrors = validator ? validator(newValues) : {};
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  return { errors, isValid, handleChange, handleSubmit, setErrors, values };
};