import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { paymentFailure } from "../../redux/paymentSlice";
import { updatePaymentStatus } from "../../redux/cartSlice";
import { createPayment } from "../../services/apiPayment";

export const useProcessPayment = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const createPaymentMutation = useMutation({
    mutationFn: async ({ total, items }) => {
      if (!user || !user.id) {
        throw new Error("No user data available.");
      }

      try {
        const paymentData = await createPayment({
          userId: user.id,
          total,
          items,
        });

        if (!paymentData || paymentData.length === 0) {
          throw new Error("No payment data returned.");
        }

        return paymentData;
      } catch (error) {
        console.error("Failed to process payment:", error);
        toast.error("Failed to process payment. Please try again.");
        throw error;
      }
    },

    onSuccess: (data) => {
      const paymentData =
        Array.isArray(data) && data.length > 0 ? data[0] : data;
      if (
        !paymentData ||
        // !paymentData.paymentId ||
        !paymentData.items ||
        paymentData.items.length === 0
      ) {
        toast.error("Payment was created, but no payment data was returned.");
        console.error("No payment data returned:", data);
        console.error("Missing paymentId or items in data:", data);
      } else {
        console.log("Payment successful:", paymentData);

        queryClient.invalidateQueries("userOrders");

        dispatch(
          updatePaymentStatus({
            paymentId: paymentData.id,
            items: paymentData.items,
          })
        );

        toast.success("Payment processed successfully!");
      }
    },

    onError: (error) => {
      console.error("Error processing payment:", error);
      toast.error(error.message);
      dispatch(paymentFailure());
    },
  });

  const processPayment = async ({ total, items }) => {
    try {
      console.log("Processing payment with data:", { total, items });
      await createPaymentMutation.mutateAsync({ total, items });
    } catch (error) {
      console.error("Error in processing payment:", error);
      toast.error("Failed to process payment.");
    }
  };

  return {
    processPayment,
    isProcessingPayment: createPaymentMutation.isLoading, // وضعیت بارگذاری
  };
};
