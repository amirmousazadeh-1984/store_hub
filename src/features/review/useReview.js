import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReviews, createReview } from "../../services/apiReview";

export const useReviews = (productId) => {
  const query = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId),
    enabled: !!productId,
  });

  return query;
};

// Hook to add a new review
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      // Invalidate and refetch the reviews when a new review is added
      queryClient.invalidateQueries(["reviews"]);
      console.log(
        "Review added successfully, invalidating queries for reviews."
      );
    },
    onError: (error) => {
      console.error("Error adding review:", error);
      // Handle the error as needed (e.g., show a notification)
    },
  });
};
