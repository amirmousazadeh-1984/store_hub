import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCar } from "../../services/apiProducts";

export function useCreateCar() {
  const queryClient = useQueryClient();

  const { mutate: createCar, isLoading: isCreating } = useMutation({
    mutationFn: createEditCar,
    onSuccess: () => {
      toast.success("New car successfully created");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCar };
}
