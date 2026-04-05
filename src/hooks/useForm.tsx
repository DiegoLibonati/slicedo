import { useState } from "react";

import type { UseForm } from "@/types/hooks";

export const useForm = <T,>(initialForm: T): UseForm<T> => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  return {
    formState: formState,
    onInputChange: onInputChange,
    onTextAreaChange: onTextAreaChange,
    onResetForm: onResetForm,
  };
};
