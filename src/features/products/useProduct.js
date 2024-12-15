import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar } from "../../services/apiProducts";

export function useProduct() {
  const { id } = useParams();

  const {
    isLoading,
    data: car,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCar(parseInt(id)),
  });

  return { isLoading, car, error };
}
