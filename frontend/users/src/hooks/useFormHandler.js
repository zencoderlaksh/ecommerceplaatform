import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useFormHandler = (schema) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
